package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.notification.NotificationReferenceEnum;
import com.minh.enumeration.notification.NotificationTemplateEnum;
import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.model.dto.scholarship.ScholarshipFollowerDto;
import com.minh.model.dto.scholarship.ScholarshipPreferenceDto;
import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.entity.junction.ScholarshipFollowerEntity;
import com.minh.scholarship.data.entity.junction.ScholarshipMediaEntity;
import com.minh.scholarship.data.mapper.ScholarshipFollowerMapper;
import com.minh.scholarship.data.mapper.ScholarshipMapper;
import com.minh.scholarship.data.mapper.ScholarshipPreferenceMapper;
import com.minh.scholarship.data.repository.ScholarshipFollowerRepository;
import com.minh.scholarship.data.repository.ScholarshipMediaRepository;
import com.minh.scholarship.data.repository.ScholarshipPreferenceRepository;
import com.minh.scholarship.data.repository.ScholarshipRepository;
import com.minh.scholarship.data.vo.NotificationVo;
import com.minh.scholarship.data.vo.ProviderProfileVo;
import com.minh.scholarship.data.vo.ScholarshipVo;
import com.minh.scholarship.data.vo.projection.ScholarshipProjection;
import com.minh.scholarship.feign.MediaFeign;
import com.minh.scholarship.feign.NotificationTemplateFeign;
import com.minh.scholarship.feign.ProviderProfileFeign;
import com.minh.scholarship.message.KafkaProducer;
import com.minh.scholarship.model.filter.ScholarshipFilter;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.base.BaseService;
import com.minh.utils.SecurityUtil;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl extends BaseService implements ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipMapper scholarshipMapper;
    private final ScholarshipMediaRepository scholarshipMediaRepository;
    private final MediaFeign mediaFeign;
    private final NotificationTemplateFeign notificationTemplateFeign;
    private final KafkaProducer kafkaProducer;
    private final ProviderProfileFeign providerProfileFeign;
    private final ScholarshipPreferenceRepository scholarshipPreferenceRepository;
    private final ScholarshipPreferenceMapper scholarshipPreferenceMapper;
    private final ScholarshipFollowerRepository scholarshipFollowerRepository;
    private final ScholarshipFollowerMapper scholarshipFollowerMapper;

    @Value("${kafka.scholarship.new-event.topic}")
    private String newEventScholarshipTopic;

    @Override
    public List<ScholarshipDto> getAll() {
        return scholarshipMapper.toDto(scholarshipRepository.findAll());
    }

    @Override
    public ScholarshipVo getById(Long id) {
        ScholarshipEntity entity = scholarshipRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        List<ScholarshipPreferenceDto> preferences = scholarshipPreferenceMapper.toDto(scholarshipPreferenceRepository.findByScholarshipId(entity.getId()));
        ScholarshipVo scholarshipVo = scholarshipMapper.entityToVo(entity);
        scholarshipVo.setScholarshipPreferences(preferences);
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getOne(entity.getProviderId()));
        if (ObjectUtils.isNotEmpty(providerProfileVo)) {
            scholarshipVo.setProviderProfileVo(providerProfileVo);
        }
        return addScholarshipMedia(scholarshipVo);
    }

    private ScholarshipVo addScholarshipMedia(ScholarshipVo scholarshipVo) {
        List<ScholarshipMediaEntity> mediaEntity = scholarshipMediaRepository.findByScholarshipId(scholarshipVo.getId());
        if (ObjectUtils.isNotEmpty(mediaEntity)) {
            List<MediaDto> medias = this.parseResponse(mediaFeign.getByIds(mediaEntity.stream().map(ScholarshipMediaEntity::getMediaId).collect(Collectors.toList())));
            scholarshipVo.setScholarshipMedias(medias);
        }
        return scholarshipVo;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipVo create(ScholarshipVo scholarship, List<MultipartFile> images) {
        if (scholarshipRepository.isExistSlug(scholarship.getSlug())) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_SLUG_IS_ALREADY_EXIST);
        }
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getMyProviderInfo());
        if (ObjectUtils.isEmpty(providerProfileVo)) {
            throw new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST);
        }
        scholarship.setProviderId(providerProfileVo.getId());
        ScholarshipEntity savedScholarship = scholarshipRepository.save(scholarshipMapper.toEntity(scholarship));
        if (ObjectUtils.isNotEmpty(images)) {
            uploadImages(scholarship, images, savedScholarship.getId());
        }
        List<ScholarshipPreferenceDto> scholarshipPreferences = scholarship.getScholarshipPreferences();
        if (!scholarshipPreferences.isEmpty()) {
            scholarshipPreferenceRepository.saveAll(scholarshipPreferenceMapper.toEntity(scholarshipPreferences));
        }
        NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.SCHOLARSHIP_NEW.getCode()));
        NotificationVo notificationVo = NotificationVo.builder()
                .topic(NotificationTopicEnum.SCHOLARSHIP_FOLLOWER)
                .title(notificationTemplateDto.getTitle().replace("{{providerName}}", providerProfileVo.getOrganizationName()))
                .content(notificationTemplateDto.getContent().replace("{{providerName}}", providerProfileVo.getOrganizationName())
                        .replace("{{providerName}}", providerProfileVo.getOrganizationName())
                        .replace("{{scholarshipName}}", savedScholarship.getTitle()))
                .isRead(false)
                .referenceId(savedScholarship.getId())
                .referenceType(NotificationReferenceEnum.SCHOLARSHIP.getCode())
                .slug(savedScholarship.getSlug())
                .userId(UaaContextHolder.getUserId())
                .build();
        kafkaProducer.convertToByteAndSend(newEventScholarshipTopic, notificationVo);
        return scholarshipMapper.entityToVo(savedScholarship);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipVo update(ScholarshipVo scholarship, List<MultipartFile> images) {
        ScholarshipEntity entity = scholarshipRepository.findByIdAndActive(scholarship.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        scholarshipMediaRepository.deleteAllByScholarshipId(entity.getId());
        if (ObjectUtils.isNotEmpty(images)) {
            uploadImages(scholarship, images, entity.getId());
        }
        scholarshipPreferenceRepository.deleteAllByScholarshipId(entity.getId());
        if (!scholarship.getScholarshipPreferences().isEmpty()) {
            scholarshipPreferenceRepository.saveAll(scholarshipPreferenceMapper.toEntity(scholarship.getScholarshipPreferences()));
        }
        scholarshipMapper.updateEntityFromVo(scholarship, entity);
        return scholarshipMapper.entityToVo(scholarshipRepository.save(entity));
    }


    private void uploadImages(ScholarshipDto scholarship, List<MultipartFile> images, Long id) {
        images.forEach(image -> {
            MediaDto request = new MediaDto();
            request.setFileName(image.getOriginalFilename());
            request.setSize(image.getSize());
            request.setContentType(image.getContentType());
            try {
                request.setThumbnail(image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            request.setIsPublic(true);
            request.setFolderName("scholarship/" + id);
            MediaDto mediaDto = this.parseResponse(mediaFeign.create(request));

            ScholarshipMediaEntity entity = new ScholarshipMediaEntity();
            entity.setScholarshipId(id);
            entity.setMediaId(mediaDto.getId());
            scholarshipMediaRepository.save(entity);
        });
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!scholarshipRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
        }
        scholarshipRepository.updateActiveById(id, false);
    }

    @Override
    public ScholarshipVo getByIdAll(Long id) {
        ScholarshipEntity entity = scholarshipRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        List<ScholarshipPreferenceDto> preferences = scholarshipPreferenceMapper.toDto(scholarshipPreferenceRepository.findByScholarshipId(entity.getId()));
        ScholarshipVo scholarshipVo = scholarshipMapper.entityToVo(entity);
        scholarshipVo.setScholarshipPreferences(preferences);
        return scholarshipVo;
    }

    @Override
    public Page<ScholarshipVo> getPage(ScholarshipFilter filter) {
        filter.beautify();
        String userId = SecurityUtil.getCurrentUserId();
        return scholarshipRepository.getPageableAuthorized(filter.getPageable(), filter.getCriteria().getUniversity(),
                filter.getCriteria().getCountry(), filter.getCriteria().getScholarshipType(),
                filter.getCriteria().getStudyLevel(), userId).map(o -> {
            ScholarshipVo scholarshipVo = scholarshipMapper.proToVo(o);
            scholarshipVo.setProviderProfileVo(this.parseResponse(providerProfileFeign.getOne(scholarshipVo.getProviderId())));
            return addScholarshipMedia(scholarshipVo);
        });
    }

    @Override
    public List<ScholarshipVo> getByIds(List<Long> ids) {
        String userId = SecurityUtil.getCurrentUserId();
        List<ScholarshipProjection> allVoByIds = scholarshipRepository.getAllVoByIds(ids, userId);
        List<ScholarshipVo> scholarshipVos = scholarshipMapper.prosToVos(allVoByIds);
        scholarshipVos.forEach(o -> {
            o.setProviderProfileVo(this.parseResponse(providerProfileFeign.getOne(o.getId())));
        });
        return scholarshipVos;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipFollowerDto createScholarshipFollower(ScholarshipFollowerDto dto) {
        dto.setUserId(UaaContextHolder.getUserId());
        return scholarshipFollowerMapper.toDto(
                scholarshipFollowerRepository.save(
                        scholarshipFollowerMapper.toEntity(dto)));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipFollowerDto deleteScholarshipFollower(ScholarshipFollowerDto dto) {
        String userId = UaaContextHolder.getUserId();
        scholarshipFollowerRepository.deleteByScholarshipIdAndUserId(dto.getScholarshipId(), userId);
        return dto;
    }

    @Override
    public List<ScholarshipVo> getMyScholarship() {
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getMyProviderInfo());
        List<ScholarshipEntity> scholarshipEntities = scholarshipRepository.getAllByProviderIdAndActive(providerProfileVo.getId(), true);
        List<ScholarshipVo> scholarshipVos = new ArrayList<>();
        scholarshipEntities.forEach(entity -> {
            scholarshipVos.add(this.getById(entity.getId()));
        });
        return scholarshipVos;
    }

    @Override
    public List<ScholarshipVo> getScholarshipFollow() {
        List<ScholarshipVo> scholarshipVos = new ArrayList<>();
        String userId = UaaContextHolder.getUserId();
        List<ScholarshipFollowerEntity> scholarshipFollowerEntities = scholarshipFollowerRepository.getByUserId(userId);
        if (ObjectUtils.isNotEmpty(scholarshipFollowerEntities)) {
            List<ScholarshipEntity> scholarshipEntities = scholarshipRepository.findByIdIn(scholarshipFollowerEntities.stream().map(ScholarshipFollowerEntity::getScholarshipId).collect(Collectors.toList()));
            scholarshipEntities.forEach(entity -> {
                scholarshipVos.add(this.getById(entity.getId()));
            });
        }
        return scholarshipVos;
    }

    @Override
    public ScholarshipVo getBySlug(String slug) {
        Optional<ScholarshipEntity> entity = scholarshipRepository.findBySlug(slug);
        return entity.map(scholarshipEntity -> this.getById(scholarshipEntity.getId())).orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
    }

    @Override
    public List<ScholarshipVo> getScholarshipByProviderId(Long id) {
        List<ScholarshipEntity> entities = scholarshipRepository.getAllByProviderId(id);
        List<ScholarshipVo> scholarshipVos = new ArrayList<>();
        entities.forEach(entity -> {
            scholarshipVos.add(this.getById(entity.getId()));
        });
        return scholarshipVos;
    }

}
