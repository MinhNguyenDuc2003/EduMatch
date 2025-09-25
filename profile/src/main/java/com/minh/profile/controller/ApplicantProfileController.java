package com.minh.profile.controller;

import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.profile.data.vo.ApplicantProfileVo;
import com.minh.profile.service.ApplicantProfileService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ApplicantProfileController {
    private final ApplicantProfileService profileService;

    @Authorized
    @PostMapping
    public ApiResponse<ApplicantProfileDto> create(@RequestBody ApplicantProfileVo profile) {
        return ApiResponse.ok(profileService.create(profile));
    }

    @Authorized
    @GetMapping("/{id}")
    public ApiResponse<ApplicantProfileVo> getOne(@PathVariable Long id) {
        return ApiResponse.ok(profileService.getOne(id));
    }

    @Authorized
    @PutMapping
    public ApiResponse<ApplicantProfileDto> update(@RequestBody ApplicantProfileVo profile) {
        return ApiResponse.ok(profileService.update(profile));
    }

    @Authorized
    @GetMapping("/user")
    public ApiResponse<ApplicantProfileVo> getOneByUserId(@RequestParam String userId) {
        return ApiResponse.ok(profileService.getOneByUserId(userId));
    }

}
