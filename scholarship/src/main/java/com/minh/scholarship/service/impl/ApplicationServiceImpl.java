package com.minh.scholarship.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.scholarship.data.entity.ApplicationAttributeEntity;
import com.minh.scholarship.data.entity.ApplicationEntity;
import com.minh.scholarship.data.entity.ApplicationScholarshipEntity;
import com.minh.scholarship.data.entity.junction.ApplicationMediaEntity;
import com.minh.scholarship.data.mapper.ApplicationAttributeMapper;
import com.minh.scholarship.data.mapper.ApplicationMapper;
import com.minh.scholarship.data.repository.ApplicationAttributeRepository;
import com.minh.scholarship.data.repository.ApplicationMediaRepository;
import com.minh.scholarship.data.repository.ApplicationRepository;
import com.minh.scholarship.data.repository.ApplicationScholarshipRepository;
import com.minh.scholarship.data.vo.ApplicationVo;
import com.minh.scholarship.feign.MediaFeign;
import com.minh.scholarship.model.filter.ApplicationFilter;
import com.minh.scholarship.service.ApplicationService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl extends BaseService implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;
    private final ApplicationMediaRepository applicationMediaRepository;
    private final ApplicationAttributeRepository applicationAttributeRepository;
    private final ApplicationScholarshipRepository applicationScholarshipRepository;
    private final MediaFeign mediaFeign;
    private final ApplicationAttributeMapper applicationAttributeMapper;

    @Override
    public List<ApplicationVo> getAll() {
        return applicationRepository.findAll().stream()
                .map(applicationMapper::entityToVo)
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationVo getById(Long id) {
        ApplicationEntity entity = applicationRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST));
        ApplicationVo vo = applicationMapper.entityToVo(entity);
        addAttributesAndMedia(vo);
        return vo;
    }

    private void addAttributesAndMedia(ApplicationVo vo) {
        vo.setApplicationAttributes(
                applicationAttributeRepository.findAllByApplicationId(vo.getId())
                        .stream()
                        .map(applicationMapper::toAttributeDto)
                        .collect(Collectors.toList())
        );

        List<ApplicationMediaEntity> mediaEntities = applicationMediaRepository.findAllByApplicationId(vo.getId());
        if (ObjectUtils.isNotEmpty(mediaEntities)) {
            List<MediaDto> medias = this.parseResponse(mediaFeign.getByIds(
                    mediaEntities.stream().map(ApplicationMediaEntity::getMediaId).collect(Collectors.toList())
            ));
            vo.setApplicationMedias(medias);
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationVo create(ApplicationVo applicationVo, List<MultipartFile> mediaFiles) throws JsonProcessingException {
        String userId = UaaContextHolder.getUserId();
        applicationVo.setUserId(userId);

        Optional<ApplicationEntity> existByCodeAndVersion = applicationRepository.findByCodeAndVersionApplicationAndActive(applicationVo.getCode(), applicationVo.getVersionApplication(), true);
        if (existByCodeAndVersion.isPresent()) {
            throw new BusinessException(CoreMessageCode.APPLICATION_CODE_AND_VERSION_ALREADY_EXIST);
        }
        ApplicationEntity entity = applicationRepository.save(applicationMapper.toEntity(applicationVo));

        if (ObjectUtils.isNotEmpty(applicationVo.getApplicationAttributes())) {
            List<ApplicationAttributeEntity> attributeEntities = applicationAttributeMapper.toEntity(applicationVo.getApplicationAttributes());
            attributeEntities.forEach(o -> o.setApplicationId(entity.getId()));
            applicationAttributeRepository.saveAll(attributeEntities);
        }

        if (ObjectUtils.isNotEmpty(mediaFiles)) {
            uploadImages(mediaFiles, entity.getId());
        }

        return getById(entity.getId());
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationVo update(Long id, ApplicationVo applicationVo) {
        String userId = UaaContextHolder.getUserId();
        applicationVo.setUserId(userId);
        ApplicationEntity entity = applicationRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST));

        List<ApplicationScholarshipEntity> byApplicationCodeAndApplicationVersion = applicationScholarshipRepository.findByApplicationIdAndActive(applicationVo.getId(), true);
        if (ObjectUtils.isNotEmpty(byApplicationCodeAndApplicationVersion)) {
            throw new BusinessException(CoreMessageCode.APPLICATION_IS_ALREADY_SUBMITTED_PLEASE_UPDATE_VERSION);
        }

        applicationMapper.updateEntityFromVo(applicationVo, entity);
        ApplicationEntity saved = applicationRepository.save(entity);

        applicationAttributeRepository.deleteAllByApplicationId(id);

        if (ObjectUtils.isNotEmpty(applicationVo.getApplicationAttributes())) {
            List<ApplicationAttributeEntity> attributeEntities = applicationAttributeMapper.toEntity(applicationVo.getApplicationAttributes());
            attributeEntities.forEach(o -> o.setApplicationId(saved.getId()));
            applicationAttributeRepository.saveAll(attributeEntities);
        }
        return getById(id);
    }

    private void uploadImages(List<MultipartFile> images, Long id) {
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
            request.setFolderName("application/" + id);
            MediaDto mediaDto = this.parseResponse(mediaFeign.create(request));

            ApplicationMediaEntity entity = new ApplicationMediaEntity();
            entity.setApplicationId(id);
            entity.setMediaId(mediaDto.getId());
            applicationMediaRepository.save(entity);
        });
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST);
        }
        if(applicationScholarshipRepository.existsByApplicationIdAndActive(id, true)) {
            throw new BusinessException(CoreMessageCode.APPLICATION_IS_ALREADY_SUBMIT);
        }
        applicationRepository.updateActiveById(id, false);

//        applicationScholarshipRepository.softDeleteByScholarshipId(id);
    }

    @Override
    public List<ApplicationVo> getAllMyApplication() {
        String userId = UaaContextHolder.getUserId();
        List<ApplicationVo> vos = applicationMapper.entitiesToVos(applicationRepository.findAllByUserIdAndActive(userId, true));
        vos.forEach(this::addAttributesAndMedia);
        return vos;
    }

    @Override
    public List<ApplicationVo> getApplicationByScholarshipId(Long id) {
        List<ApplicationScholarshipEntity> applicationScholarshipEntities = applicationScholarshipRepository.findAllByScholarshipId(id);
        List<ApplicationVo> vos = applicationMapper.entitiesToVos(applicationRepository.findAllById(applicationScholarshipEntities.stream().map(ApplicationScholarshipEntity::getApplicationId).collect((Collectors.toList()))));
        vos.forEach(this::addAttributesAndMedia);
        return vos;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean addImagesToApplication(Long id, List<MultipartFile> mediaFiles) {
        this.uploadImages(mediaFiles, id);
        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean deleteImagesToApplication(Long id, List<Long> mediaIds) {
        mediaIds.forEach(mediaId -> {
            applicationMediaRepository.deleteByApplicationIdAndMediaId(id, mediaId);
        });
        return true;
    }

    @Override
    public List<ApplicationVo> getByCode(String code) {
        List<ApplicationEntity> entity = applicationRepository.findByCodeAndActive(code, true);
        if (ObjectUtils.isEmpty(entity)) {
            return null;
        }
        List<ApplicationVo> vo = applicationMapper.entitiesToVos(entity);
        vo.forEach(this::addAttributesAndMedia);
        return vo;
    }

    @Override
    public Page<ApplicationVo> getPage(ApplicationFilter filter) {
        return applicationRepository.getPageable(filter.getPageable()).map(o -> {
            ApplicationVo applicationVo = applicationMapper.entityToVo(o);
            return addApplicationMedia(applicationVo);
        });
    }

    private ApplicationVo addApplicationMedia(ApplicationVo applicationVo) {
        List<ApplicationMediaEntity> mediaEntities = applicationMediaRepository.findAllByApplicationId(applicationVo.getId());
        if (ObjectUtils.isNotEmpty(mediaEntities)) {
            List<MediaDto> medias = this.parseResponse(
                    mediaFeign.getByIds(
                            mediaEntities.stream()
                                    .map(ApplicationMediaEntity::getMediaId)
                                    .collect(Collectors.toList())
                    )
            );
            applicationVo.setApplicationMedias(medias);
        }
        return applicationVo;
    }

}