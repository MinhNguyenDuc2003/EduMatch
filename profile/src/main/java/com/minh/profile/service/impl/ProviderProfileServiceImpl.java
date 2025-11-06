package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.profile.ProviderContactDto;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.profile.data.entity.ProviderContactEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.entity.junction.ProviderMediaEntity;
import com.minh.profile.data.mapper.ProviderContactMapper;
import com.minh.profile.data.mapper.ProviderNewsMapper;
import com.minh.profile.data.mapper.ProviderProfileMapper;
import com.minh.profile.data.repository.*;
import com.minh.profile.data.vo.ProviderProfileVo;
import com.minh.profile.feign.MediaFeign;
import com.minh.profile.service.ProviderProfileService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
public class ProviderProfileServiceImpl extends BaseService implements ProviderProfileService {

    @Autowired
    private ProviderProfileRepository providerProfileRepository;
    @Autowired
    private ProviderContactRepository providerContactRepository;
    @Autowired
    private ProviderNewsRepository providerNewsRepository;
    @Autowired
    private ProviderNewsMediaRepository providerNewsMediaRepository;
    @Autowired
    private ProviderMediaRepository providerMediaRepository;

    @Autowired
    private ProviderProfileMapper providerProfileMapper;
    @Autowired
    private ProviderContactMapper providerContactMapper;
    @Autowired
    private ProviderNewsMapper providerNewsMapper;

    @Autowired
    private MediaFeign mediaFeign;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ProviderProfileDto create(ProviderProfileVo profile, MultipartFile logo, MultipartFile banner) throws IOException {
        profile.setUserId(UaaContextHolder.getUserId());
        ProviderProfileEntity savedProfile = providerProfileRepository.save(providerProfileMapper.voToEntity(profile));
        List<ProviderContactDto> providerContactDtos = profile.getProviderContactDtos();
        providerContactDtos.forEach(pc -> {
            pc.setProviderId(savedProfile.getId());
        });
        providerContactRepository.saveAll(providerContactMapper.toEntity(providerContactDtos));

        if (ObjectUtils.isNotEmpty(logo)) {
            MediaDto logoRequest = new MediaDto();
            logoRequest.setFileName(logo.getOriginalFilename());
            logoRequest.setSize(logo.getSize());
            logoRequest.setContentType(logo.getContentType());
            logoRequest.setThumbnail(logo.getBytes());
            logoRequest.setIsPublic(true);
            logoRequest.setFolderName("providers/" + savedProfile.getId());
            MediaDto mediaDto = this.parseResponse(mediaFeign.create(logoRequest));

            ProviderMediaEntity logoMediaEntity = new ProviderMediaEntity();
            logoMediaEntity.setProviderId(savedProfile.getId());
            logoMediaEntity.setMediaId(mediaDto.getId());
            logoMediaEntity.setImageType("LOGO");
            providerMediaRepository.save(logoMediaEntity);
        }

        if (ObjectUtils.isNotEmpty(banner)) {
            MediaDto bannerRequest = new MediaDto();
            bannerRequest.setFileName(banner.getOriginalFilename());
            bannerRequest.setSize(banner.getSize());
            bannerRequest.setContentType(banner.getContentType());
            bannerRequest.setThumbnail(banner.getBytes());
            bannerRequest.setFolderName("providers/" + savedProfile.getId());
            bannerRequest.setIsPublic(true);
            MediaDto mediaBanner = this.parseResponse(mediaFeign.create(bannerRequest));

            ProviderMediaEntity bannerMediaEntity = new ProviderMediaEntity();
            bannerMediaEntity.setProviderId(savedProfile.getId());
            bannerMediaEntity.setMediaId(mediaBanner.getId());
            bannerMediaEntity.setImageType("BANNER");
            providerMediaRepository.save(bannerMediaEntity);
        }
        return providerProfileMapper.toDto(savedProfile);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ProviderProfileDto update(ProviderProfileVo profile, MultipartFile logo, MultipartFile banner) throws IOException {
        ProviderProfileEntity existing = providerProfileRepository
                .findById(profile.getId())
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST));
        providerProfileMapper.updateEntityFromVo(profile, existing);
        ProviderProfileEntity savedProfile = providerProfileRepository.save(existing);
        List<ProviderContactDto> providerContactDtos = profile.getProviderContactDtos();
        providerContactRepository.saveAll(providerContactMapper.toEntity(providerContactDtos));

        if (ObjectUtils.isNotEmpty(logo)) {
            MediaDto logoRequest = new MediaDto();
            logoRequest.setFileName(logo.getOriginalFilename());
            logoRequest.setSize(logo.getSize());
            logoRequest.setContentType(logo.getContentType());
            logoRequest.setThumbnail(logo.getBytes());
            logoRequest.setFolderName("providers/" + savedProfile.getId());
            logoRequest.setIsPublic(true);
            MediaDto mediaDto = this.parseResponse(mediaFeign.create(logoRequest));

            providerMediaRepository.deleteByProviderIdAndImageType(profile.getId(), "LOGO");
            ProviderMediaEntity logoMediaEntity = new ProviderMediaEntity();
            logoMediaEntity.setProviderId(savedProfile.getId());
            logoMediaEntity.setMediaId(mediaDto.getId());
            logoMediaEntity.setImageType("LOGO");
            providerMediaRepository.save(logoMediaEntity);
        }

        if (ObjectUtils.isNotEmpty(banner)) {
            MediaDto bannerRequest = new MediaDto();
            bannerRequest.setFileName(banner.getOriginalFilename());
            bannerRequest.setSize(banner.getSize());
            bannerRequest.setContentType(banner.getContentType());
            bannerRequest.setThumbnail(banner.getBytes());
            bannerRequest.setFolderName("providers/" + savedProfile.getId());
            bannerRequest.setIsPublic(true);
            MediaDto mediaBanner = this.parseResponse(mediaFeign.create(bannerRequest));

            providerMediaRepository.deleteByProviderIdAndImageType(profile.getId(), "BANNER");
            ProviderMediaEntity bannerMediaEntity = new ProviderMediaEntity();
            bannerMediaEntity.setProviderId(savedProfile.getId());
            bannerMediaEntity.setMediaId(mediaBanner.getId());
            bannerRequest.setFolderName("providers/" + savedProfile.getId());
            bannerMediaEntity.setImageType("BANNER");
            providerMediaRepository.save(bannerMediaEntity);
        }

        return providerProfileMapper.toDto(savedProfile);
    }

    @Override
    public ProviderProfileVo getById(Long id) {
        ProviderProfileEntity providerProfileEntity = providerProfileRepository
                .findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST));
        ProviderProfileVo vo = providerProfileMapper.toVo(providerProfileEntity);
        List<ProviderContactEntity> contacts = providerContactRepository.findByProviderId(id);
        vo.setProviderContactDtos(providerContactMapper.toDto(contacts));
        List<ProviderMediaEntity> medias = providerMediaRepository.findByProviderId(id);
        Long logoId = medias.stream().filter(o -> "LOGO".equalsIgnoreCase(o.getImageType())).map(ProviderMediaEntity::getMediaId).findFirst().orElse(null);
        if (ObjectUtils.isNotEmpty(logoId)) {
            MediaDto logo = this.parseResponse(mediaFeign.getById(logoId));
            vo.setLogoUrl(logo.getUrl());
        }
        Long bannerId = medias.stream().filter(o -> "BANNER".equalsIgnoreCase(o.getImageType())).map(ProviderMediaEntity::getMediaId).findFirst().orElse(null);
        if (ObjectUtils.isNotEmpty(logoId)) {
            MediaDto banner = this.parseResponse(mediaFeign.getById(bannerId));
            vo.setBannerUrl(banner.getUrl());
        }
        return vo;
    }

    @Override
    public ProviderProfileVo getMyProviderInfo() {
        String userId = UaaContextHolder.getUserId();
        ProviderProfileEntity providerProfileEntity = providerProfileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST));
        ProviderProfileVo vo = providerProfileMapper.toVo(providerProfileEntity);
        List<ProviderContactEntity> contacts = providerContactRepository.findByProviderId(providerProfileEntity.getId());
        vo.setProviderContactDtos(providerContactMapper.toDto(contacts));
        List<ProviderMediaEntity> medias = providerMediaRepository.findByProviderId(providerProfileEntity.getId());
        Long logoId = medias.stream().filter(o -> "LOGO".equalsIgnoreCase(o.getImageType())).map(ProviderMediaEntity::getMediaId).findFirst().orElse(null);
        if (ObjectUtils.isNotEmpty(logoId)) {
            MediaDto logo = this.parseResponse(mediaFeign.getById(logoId));
            vo.setLogoUrl(logo.getUrl());
        }
        Long bannerId = medias.stream().filter(o -> "BANNER".equalsIgnoreCase(o.getImageType())).map(ProviderMediaEntity::getMediaId).findFirst().orElse(null);
        if (ObjectUtils.isNotEmpty(logoId)) {
            MediaDto banner = this.parseResponse(mediaFeign.getById(bannerId));
            vo.setBannerUrl(banner.getUrl());
        }
        return vo;
    }

    @Override
    public List<ProviderProfileDto> getUnverifiedProviders() {
        List<ProviderProfileEntity> entities = providerProfileRepository.findByVerifiedFalse();
        return providerProfileMapper.toDto(entities);
    }

    @Override
    @Transactional
    public void changeVerifiedStatus(Long providerId, Boolean verified) {
        ProviderProfileEntity entity = providerProfileRepository.findById(providerId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST));
        entity.setVerified(verified);
        providerProfileRepository.save(entity);
    }


}
