package com.minh.profile.service;

import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.profile.data.vo.ProviderProfileVo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProviderProfileService {

    ProviderProfileDto create(ProviderProfileVo profile, MultipartFile logo, MultipartFile banner) throws IOException;

    ProviderProfileDto update(ProviderProfileVo profile, MultipartFile logo, MultipartFile banner) throws IOException;

    ProviderProfileVo getById(Long id);

    ProviderProfileVo getMyProviderInfo();

    List<ProviderProfileDto> getUnverifiedProviders();

    void changeVerifiedStatus(Long providerId, Boolean verified);
}
