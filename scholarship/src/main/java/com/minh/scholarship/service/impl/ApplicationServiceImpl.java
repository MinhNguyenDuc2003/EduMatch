package com.minh.scholarship.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.scholarship.ApplicationAttributeDto;
import com.minh.scholarship.data.entity.ApplicationEntity;
import com.minh.scholarship.data.entity.junction.ApplicationMediaEntity;
import com.minh.scholarship.data.mapper.ApplicationMapper;
import com.minh.scholarship.data.repository.ApplicationRepository;
import com.minh.scholarship.data.repository.ApplicationMediaRepository;
import com.minh.scholarship.data.repository.ApplicationAttributeRepository;
import com.minh.scholarship.data.vo.ApplicationVo;
import com.minh.scholarship.feign.MediaFeign;
import com.minh.scholarship.model.filter.ApplicationFilter;
import com.minh.scholarship.service.ApplicationService;
import com.minh.service.base.BaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl extends BaseService implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;
    private final ApplicationMediaRepository applicationMediaRepository;
    private final ApplicationAttributeRepository applicationAttributeRepository;
    private final MediaFeign mediaFeign;
    private final ObjectMapper objectMapper = new ObjectMapper();

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
                        .map(a -> applicationMapper.toAttributeDto(a))
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
    public ApplicationVo create(ApplicationVo applicationVo, List<MultipartFile> mediaFiles, String attributesJson) {
        ApplicationEntity entity = applicationRepository.save(applicationMapper.toEntity(applicationVo));

        if (ObjectUtils.isNotEmpty(attributesJson)) {
            try {
                List<ApplicationAttributeDto> attrs =
                        objectMapper.readValue(attributesJson, new TypeReference<List<ApplicationAttributeDto>>() {});
                applicationAttributeRepository.saveAll(
                        applicationMapper.toAttributeEntity(attrs)
                );
            } catch (IOException e) {
                throw new RuntimeException("Invalid attributes JSON", e);
            }
        }

        if (ObjectUtils.isNotEmpty(mediaFiles)) {
            uploadImages(mediaFiles, entity.getId());
        }

        return getById(entity.getId());
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationVo update(Long id, ApplicationVo applicationVo, List<MultipartFile> mediaFiles, String attributesJson) {
        ApplicationEntity entity = applicationRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST));

        applicationMediaRepository.deleteAllByApplicationId(id);
        applicationAttributeRepository.deleteAllByApplicationId(id);

        if (ObjectUtils.isNotEmpty(attributesJson)) {
            try {
                List<ApplicationAttributeDto> attrs =
                        objectMapper.readValue(attributesJson, new TypeReference<List<ApplicationAttributeDto>>() {});
                applicationAttributeRepository.saveAll(
                        applicationMapper.toAttributeEntity(attrs)
                );
            } catch (IOException e) {
                throw new RuntimeException("Invalid attributes JSON", e);
            }
        }

        if (ObjectUtils.isNotEmpty(mediaFiles)) {
            uploadImages(mediaFiles, id);
        }

        applicationMapper.updateEntityFromVo(applicationVo, entity);
        applicationRepository.save(entity);
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
        applicationRepository.updateActiveById(id, false);
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