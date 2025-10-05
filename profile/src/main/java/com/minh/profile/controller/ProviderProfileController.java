package com.minh.profile.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.profile.data.vo.ProviderProfileVo;
import com.minh.profile.service.ProviderProfileService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.PROFILES.PROVIDERS)
public class ProviderProfileController {

    @Autowired
    private ProviderProfileService providerProfileService;

    @Authorized
    @GetMapping("/{id}")
    public ApiResponse<ProviderProfileVo> getOne(@PathVariable Long id) {
        return ApiResponse.ok(providerProfileService.getById(id));
    }

    @Authorized
    @PostMapping
    public ApiResponse<ProviderProfileDto> create(@RequestPart ProviderProfileVo profile,
                                                  @RequestPart(required = false) MultipartFile logo,
                                                  @RequestPart(required = false) MultipartFile banner) throws IOException {
        return ApiResponse.ok(providerProfileService.create(profile, logo, banner));
    }

    @Authorized
    @PutMapping
    public ApiResponse<ProviderProfileDto> update(@RequestPart ProviderProfileVo profile,
                                                  @RequestPart(required = false) MultipartFile logo,
                                                  @RequestPart(required = false) MultipartFile banner) throws IOException {
        return ApiResponse.ok(providerProfileService.update(profile, logo, banner));
    }

}
