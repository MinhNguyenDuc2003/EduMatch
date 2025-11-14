package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.notification.NotificationReferenceEnum;
import com.minh.enumeration.notification.NotificationTemplateEnum;
import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.model.dto.profile.ProviderNewsDto;
import com.minh.profile.data.entity.ProviderNewsEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.entity.junction.ProviderNewsMediaEntity;
import com.minh.profile.data.mapper.ProviderNewsMapper;
import com.minh.profile.data.repository.ProviderNewsMediaRepository;
import com.minh.profile.data.repository.ProviderNewsRepository;
import com.minh.profile.data.repository.ProviderProfileRepository;
import com.minh.profile.data.vo.NotificationVo;
import com.minh.profile.data.vo.ProviderNewsVo;
import com.minh.profile.data.vo.ScholarshipVo;
import com.minh.profile.feign.MediaFeign;
import com.minh.profile.feign.NotificationTemplateFeign;
import com.minh.profile.feign.ScholarshipFeign;
import com.minh.profile.message.KafkaProducer;
import com.minh.profile.service.ProviderNewsService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProviderNewsServiceImpl extends BaseService implements ProviderNewsService {

    private final ProviderNewsRepository providerNewsRepository;
    private final ProviderProfileRepository providerProfileRepository;
    private final ProviderNewsMediaRepository providerNewsMediaRepository;
    private final ProviderNewsMapper providerNewsMapper;
    private final MediaFeign mediaFeign;
    private final KafkaProducer kafkaProducer;
    private final NotificationTemplateFeign notificationTemplateFeign;
    private final ScholarshipFeign scholarshipFeign;

    @Value("${kafka.news.new-event.topic}")
    private String newEventNewsTopic;

    @Override
    public List<ProviderNewsVo> getAll() {
        List<ProviderNewsEntity> entities = providerNewsRepository.findAllByActive(true);
        return entities.stream()
                .map(this::addNewsMediaAndProvider)
                .collect(Collectors.toList());
    }

    @Override
    public ProviderNewsVo getById(Long id) {
        ProviderNewsEntity entity = providerNewsRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_NEWS_IS_NOT_EXIST));
        return addNewsMediaAndProvider(entity);
    }

    @Override
    @Transactional
    public ProviderNewsDto create(ProviderNewsDto dto, List<MultipartFile> images) {
        String userId = UaaContextHolder.getUserId();

        ProviderProfileEntity provider = providerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_NOT_FOUND));

        dto.setProviderId(String.valueOf(provider.getId()));

        if (dto.getScholarshipId() != null) {
            try {
                scholarshipFeign.getById(Long.parseLong(dto.getScholarshipId()));
            } catch (Exception e) {
                throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
            }
        }

        ProviderNewsEntity entity = providerNewsMapper.dtoToEntity(dto);
        entity.setProviderId(provider.getId());

        ProviderNewsEntity saved = providerNewsRepository.save(entity);

        if (ObjectUtils.isNotEmpty(images)) {
            uploadImages(saved.getId(), images);
        }

        NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.SCHOLARSHIP_NEWS.getCode()));
        NotificationVo notificationVo = NotificationVo.builder()
                .topic(NotificationTopicEnum.PROVIDER_FOLLOWER)
                .title(notificationTemplateDto.getTitle().replace("{{providerName}}", provider.getOrganizationName()))
                .content(notificationTemplateDto.getContent().replace("{{providerName}}", provider.getOrganizationName()))
                .isRead(false)
                .referenceId(saved.getId())
                .referenceType(NotificationReferenceEnum.PROVIDER_NEWS.getCode())
                .userId(UaaContextHolder.getUserId())
                .userNotificationId(notificationTemplateDto.getId())
                .build();
        kafkaProducer.convertToByteAndSend(newEventNewsTopic, notificationVo);

        return getById(saved.getId());
    }

    @Override
    @Transactional
    public ProviderNewsDto update(Long id, ProviderNewsDto dto) {
        ProviderNewsEntity entity = providerNewsRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_NEWS_IS_NOT_EXIST));

        if (dto.getScholarshipId() != null) {
            try {
                scholarshipFeign.getById(Long.parseLong(dto.getScholarshipId()));
            } catch (Exception e) {
                throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
            }
        }

        providerNewsMapper.updateEntityFromDto(dto, entity);
        ProviderNewsEntity saved = providerNewsRepository.save(entity);

        return getById(saved.getId());
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!providerNewsRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.PROVIDER_NEWS_IS_NOT_EXIST);
        }
        providerNewsRepository.updateActiveById(id);
    }

    @Override
    public Boolean addImagesToNews(Long id, List<MultipartFile> mediaFiles) {
        this.uploadImages(id, mediaFiles);
        return true;
    }

    @Override
    public Boolean deleteImagesToNews(Long id, List<Long> mediaIds) {
        mediaIds.forEach(mediaId -> {
            providerNewsMediaRepository.deleteByProviderNewsIdAndMediaId(id, mediaId);
        });
        return true;
    }

    private void uploadImages(Long providerNewsId, List<MultipartFile> images) {
        for (MultipartFile image : images) {
            try {
                MediaDto mediaRequest = new MediaDto();
                mediaRequest.setFileName(image.getOriginalFilename());
                mediaRequest.setContentType(image.getContentType());
                mediaRequest.setSize(image.getSize());
                mediaRequest.setThumbnail(image.getBytes());
                mediaRequest.setIsPublic(true);
                mediaRequest.setFolderName("provider-news/" + providerNewsId);

                MediaDto mediaDto = this.parseResponse(mediaFeign.create(mediaRequest));

                ProviderNewsMediaEntity mediaEntity = new ProviderNewsMediaEntity();
                mediaEntity.setProviderNewsId(providerNewsId);
                mediaEntity.setMediaId(mediaDto.getId());
                providerNewsMediaRepository.save(mediaEntity);

            } catch (IOException e) {
                throw new BusinessException(CoreMessageCode.UPLOAD_IMAGE_FAILED);
            }
        }
    }

    @Override
    public List<ProviderNewsVo> getAllByStatus(boolean active) {
        List<ProviderNewsEntity> entities = providerNewsRepository.findAllByActive(active);
        return entities.stream()
                .map(this::addNewsMediaAndProvider)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateStatus(Long id, boolean active) {
        if (!providerNewsRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.PROVIDER_NEWS_IS_NOT_EXIST);
        }
        providerNewsRepository.updateStatusById(id, active);
    }

    @Override
    public List<ProviderNewsVo> getMyNews() {
        List<ProviderNewsVo> providerNewsVos = new ArrayList<>();
        String userId = UaaContextHolder.getUserId();
        Optional<ProviderProfileEntity> provider = providerProfileRepository.findByUserId(userId);
        if (provider.isPresent()) {
            List<ProviderNewsEntity> allByProviderIdAndActive = providerNewsRepository.findAllByProviderIdAndActive(provider.get().getId(), true);
            allByProviderIdAndActive.forEach(p -> {
                providerNewsVos.add(this.getById(p.getId()));
            });
        }
        return providerNewsVos;
    }

    // Hàm helper để thêm media, provider và scholarship vào VO
    private ProviderNewsVo addNewsMediaAndProvider(ProviderNewsEntity entity) {
        ProviderNewsVo vo = providerNewsMapper.entityToVo(entity);

//        // --- Thêm provider profile ---
//        ProviderProfileEntity provider = providerProfileRepository.findById(entity.getProviderId())
//                .orElse(null);
//        if (provider != null) {
//            vo.setProviderProfileVo(providerNewsMapper.providerEntityToVo(provider));
//        }

        // --- Thêm media ---
        List<ProviderNewsMediaEntity> mediaEntities = providerNewsMediaRepository.findByProviderNewsId(entity.getId());
        if (ObjectUtils.isNotEmpty(mediaEntities)) {
            List<MediaDto> mediaDtos = mediaEntities.stream()
                    .map(media -> {
                        try {
                            return parseResponse(mediaFeign.getById(media.getMediaId()));
                        } catch (Exception e) {
                            return null;
                        }
                    })
                    .filter(ObjectUtils::isNotEmpty)
                    .collect(Collectors.toList());
            vo.setNewsMedias(mediaDtos);
        }

        // --- Thêm scholarship (gọi qua ScholarshipFeign) ---
        if (entity.getScholarshipId() != null) {
            try {
                ScholarshipVo scholarshipVo = this.parseResponse(scholarshipFeign.getById(entity.getScholarshipId()));
                vo.setScholarship(scholarshipVo);
            } catch (Exception e) {
                vo.setScholarship(null); // fallback nếu gọi thất bại
            }
        }

        return vo;
    }

}