package com.minh.profile.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.profile.data.vo.ProviderProfileVo;
import com.minh.profile.service.ProviderProfileService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.PROFILES.PROVIDERS)
public class ProviderProfileController {

    @Autowired
    private ProviderProfileService providerProfileService;

    @GetMapping("/{id}")
    public ApiResponse<ProviderProfileVo> getOne(@PathVariable Long id) {
        return ApiResponse.ok(providerProfileService.getById(id));
    }

    @Authorized
    @GetMapping("/my-info")
    public ApiResponse<ProviderProfileVo> getMyProviderInfo() {
        return ApiResponse.ok(providerProfileService.getMyProviderInfo());
    }

    @Authorized
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProviderProfileDto> create(
            @RequestPart("profile") String profile,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            @RequestPart(value = "banner", required = false) MultipartFile banner
    ) throws IOException {
        ProviderProfileVo profileVo = new ObjectMapper().readValue(profile, ProviderProfileVo.class);
        return ApiResponse.ok(providerProfileService.create(profileVo, logo, banner));
    }

    @Authorized
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProviderProfileDto> update(
            @RequestPart("profile") String profile,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            @RequestPart(value = "banner", required = false) MultipartFile banner
    ) throws IOException {
        ProviderProfileVo profileVo = new ObjectMapper().readValue(profile, ProviderProfileVo.class);
        return ApiResponse.ok(providerProfileService.update(profileVo, logo, banner));
    }

    @GetMapping("/unverified")
    public ApiResponse<List<ProviderProfileDto>> getUnverifiedProviders() {
        return ApiResponse.ok(providerProfileService.getUnverifiedProviders());
    }

    @Authorized
    @GetMapping("/verify/mail")
    public ApiResponse<Boolean> sendVerifyMail(String email) {
        return ApiResponse.ok(providerProfileService.sendVerifyMail(email));
    }

    @Authorized
    @GetMapping("/verify/code")
    public ApiResponse<Boolean> verifyCode(String code) {
        return ApiResponse.ok(providerProfileService.verifyCode(code));
    }

    @PutMapping("/{id}/verified")
    public ApiResponse<Void> changeVerifiedStatus(
            @PathVariable("id") Long providerId,
            @RequestParam("verified") Boolean verified
    ) {
        providerProfileService.changeVerifiedStatus(providerId, verified);
        return ApiResponse.ok();
    }

    @GetMapping("/all")
    public ApiResponse<List<ProviderProfileVo>> getAll() {
        return ApiResponse.ok(providerProfileService.getAll());
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<ProviderProfileVo> getByUserId(@PathVariable String userId) {
        return ApiResponse.ok(providerProfileService.getByUserId(userId));
    }
}
