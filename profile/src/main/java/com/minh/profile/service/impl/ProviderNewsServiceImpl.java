package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.profile.ProviderNewsDto;
import com.minh.profile.data.entity.ProviderNewsEntity;
import com.minh.profile.data.entity.junction.ProviderNewsMediaEntity;
import com.minh.profile.data.mapper.ProviderNewsMapper;
import com.minh.profile.data.repository.ProviderNewsMediaRepository;
import com.minh.profile.data.repository.ProviderNewsRepository;
import com.minh.profile.data.repository.ProviderProfileRepository;
import com.minh.profile.service.ProviderNewsService;
import com.minh.profile.feign.MediaFeign;
import com.minh.service.aspect.Authorized;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderNewsServiceImpl extends BaseService implements ProviderNewsService {

    private final ProviderNewsRepository providerNewsRepository;
    @Autowired
    private ProviderProfileRepository providerProfileRepository;
    private final ProviderNewsMediaRepository providerNewsMediaRepository;
    private final ProviderNewsMapper providerNewsMapper;
    private final MediaFeign mediaFeign;

    @Override
    public List<ProviderNewsDto> getAll() {
        return providerNewsMapper.toDto(providerNewsRepository.findAllByActive(true));
    }

    @Override
    public ProviderNewsDto getById(Long id) {
        ProviderNewsEntity entity = providerNewsRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_NEWS_IS_NOT_EXIST));
        return providerNewsMapper.entityToDto(entity);
    }

    @Override
    @Transactional
    public ProviderNewsDto create(ProviderNewsDto dto, List<MultipartFile> images) {
        String userId = UaaContextHolder.getUserId();

        Long providerId = providerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_NOT_FOUND))
                .getId();

        dto.setProviderId(String.valueOf(providerId));

        ProviderNewsEntity entity = providerNewsMapper.dtoToEntity(dto);
        entity.setProviderId(providerId);

        ProviderNewsEntity saved = providerNewsRepository.save(entity);

        if (ObjectUtils.isNotEmpty(images)) {
            uploadImages(saved.getId(), images);
        }

        return getById(saved.getId());
    }

    @Override
    @Transactional
    public ProviderNewsDto update(Long id, ProviderNewsDto dto, List<MultipartFile> images) {
        ProviderNewsEntity entity = providerNewsRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_NEWS_IS_NOT_EXIST));

        providerNewsMapper.updateEntityFromDto(dto, entity);

        if (entity.getActive() == null) {
            entity.setActive(true);
        }

        String userId = UaaContextHolder.getUserId();
        Long providerId = providerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_NOT_FOUND))
                .getId();
        entity.setProviderId(providerId);

        ProviderNewsEntity saved = providerNewsRepository.save(entity);

        providerNewsMediaRepository.deleteAllByProviderNewsId(id);

        if (ObjectUtils.isNotEmpty(images)) {
            uploadImages(saved.getId(), images);
        }

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
}