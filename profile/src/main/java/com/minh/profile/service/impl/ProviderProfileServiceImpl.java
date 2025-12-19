package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.mail.MailTypeEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.profile.ProviderContactDto;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.profile.data.entity.ProviderCodeVerifiedEntity;
import com.minh.profile.data.entity.ProviderContactEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.entity.junction.ProviderMediaEntity;
import com.minh.profile.data.mapper.ProviderContactMapper;
import com.minh.profile.data.mapper.ProviderNewsMapper;
import com.minh.profile.data.mapper.ProviderProfileMapper;
import com.minh.profile.data.repository.*;
import com.minh.profile.data.vo.ProviderProfileVo;
import com.minh.profile.data.vo.projection.ProviderProfileProjection;
import com.minh.profile.feign.MediaFeign;
import com.minh.profile.service.ProviderProfileService;
import com.minh.service.base.BaseService;
import com.minh.utils.SecurityUtil;
import com.minh.utils.UaaContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    private ProviderCodeVerifiedRepository providerCodeVerifiedRepository;

    @Autowired
    private ProviderProfileMapper providerProfileMapper;
    @Autowired
    private ProviderContactMapper providerContactMapper;
    @Autowired
    private ProviderNewsMapper providerNewsMapper;

    @Autowired
    private MediaFeign mediaFeign;
    @Value("${fe.end-point}")
    private String feEndPoint;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ProviderProfileDto create(ProviderProfileVo profile, MultipartFile logo, MultipartFile banner) throws IOException {
        String userId = UaaContextHolder.getUserId();
        profile.setUserId(userId);

        Optional<ProviderProfileEntity> existingProfile = providerProfileRepository.findByUserId(userId);
        if (existingProfile.isPresent()) {
            throw new BusinessException(CoreMessageCode.PROVIDER_PROFILE_ALREADY_EXISTS);
        }

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

        ProviderProfileEntity entity = providerProfileRepository.findById(id)
                .orElseThrow(() -> new BusinessException(
                        CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST));

        ProviderProfileVo vo = providerProfileMapper.toVo(entity);

        // Contacts
        List<ProviderContactEntity> contacts =
                providerContactRepository.findByProviderId(id);
        vo.setProviderContactDtos(providerContactMapper.toDto(contacts));

        // Media
        List<ProviderMediaEntity> medias =
                providerMediaRepository.findByProviderId(id);

        medias.stream()
                .filter(m -> "LOGO".equalsIgnoreCase(m.getImageType()))
                .findFirst()
                .ifPresent(m -> {
                    MediaDto logo = this.parseResponse(mediaFeign.getById(m.getMediaId()));
                    vo.setLogoUrl(logo.getUrl());
                });

        medias.stream()
                .filter(m -> "BANNER".equalsIgnoreCase(m.getImageType()))
                .findFirst()
                .ifPresent(m -> {
                    MediaDto banner = this.parseResponse(mediaFeign.getById(m.getMediaId()));
                    vo.setBannerUrl(banner.getUrl());
                });

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
        if (verified) {
            MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.PROVIDER_VERIFIED.getCode()));
            String body = templateDto.getBody().replace("{{link}}", feEndPoint + "/applicant/providers/" + entity.getId());

            MailDto mailDto = new MailDto();
            mailDto.setBody(body);
            mailDto.setTo(entity.getEmail());
            mailDto.setSubject(templateDto.getSubject());
            mailDto.setTemplateId(templateDto.getId());
            mediaFeign.sendMail(mailDto);
        }
        providerProfileRepository.save(entity);
    }

    @Override
    public Boolean sendVerifyMail(String email) {
        ProviderCodeVerifiedEntity entity = new ProviderCodeVerifiedEntity();
        String code = generateCode();
        entity.setCode(code);
        entity.setUserId(UaaContextHolder.getUserId());
        entity.setExpiredTime(LocalDateTime.now().plusMinutes(10L));
        providerCodeVerifiedRepository.save(entity);

        MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.PROVIDER_VERIFIED.getCode()));
        String body = templateDto.getBody().replace("{{code}}", code);

        MailDto mailDto = new MailDto();
        mailDto.setBody(body);
        mailDto.setTo(email);
        mailDto.setSubject(templateDto.getSubject());
        mailDto.setTemplateId(templateDto.getId());
        mediaFeign.sendMail(mailDto);

        return true;
    }

    @Override
    public Boolean verifyCode(String code) {
        List<ProviderCodeVerifiedEntity> existCode = providerCodeVerifiedRepository.findByUserIdAndCodeValid(UaaContextHolder.getUserId(), code);
        return !ObjectUtils.isEmpty(existCode);
    }

    private String generateCode() {
        int code = new java.util.Random().nextInt(900000) + 100000;
        return String.valueOf(code);
    }

    @Override
    public List<ProviderProfileVo> getAll() {

        List<ProviderProfileEntity> profiles = providerProfileRepository.findAll();

        return profiles.stream().map(entity -> {
            ProviderProfileVo vo = providerProfileMapper.toVo(entity);

            // Contacts
            List<ProviderContactEntity> contacts =
                    providerContactRepository.findByProviderId(entity.getId());
            vo.setProviderContactDtos(providerContactMapper.toDto(contacts));

            // Logo + Banner
            List<ProviderMediaEntity> medias =
                    providerMediaRepository.findByProviderId(entity.getId());

            Long logoId = medias.stream()
                    .filter(m -> "LOGO".equalsIgnoreCase(m.getImageType()))
                    .map(ProviderMediaEntity::getMediaId)
                    .findFirst()
                    .orElse(null);

            if (logoId != null) {
                MediaDto logo = this.parseResponse(mediaFeign.getById(logoId));
                vo.setLogoUrl(logo.getUrl());
            }

            Long bannerId = medias.stream()
                    .filter(m -> "BANNER".equalsIgnoreCase(m.getImageType()))
                    .map(ProviderMediaEntity::getMediaId)
                    .findFirst()
                    .orElse(null);

            if (bannerId != null) {
                MediaDto banner = this.parseResponse(mediaFeign.getById(bannerId));
                vo.setBannerUrl(banner.getUrl());
            }

            return vo;
        }).toList();
    }

    public ProviderProfileVo getByUserId(String userId) {
        ProviderProfileEntity entity = providerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST));
        return providerProfileMapper.toVo(entity);
    }
}
