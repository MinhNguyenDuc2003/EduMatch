package com.minh.profile.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.profile.data.vo.ApplicantProfileVo;
import com.minh.profile.service.ApplicantProfileService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.PROFILES.APPLICANTS)
public class ApplicantProfileController {
    private final ApplicantProfileService profileService;

    @Authorized
    @PostMapping
    public ApiResponse<ApplicantProfileDto> create(@RequestBody ApplicantProfileVo profile) {
        return ApiResponse.ok(profileService.create(profile));
    }

    @GetMapping("/{id}")
    public ApiResponse<ApplicantProfileVo> getOne(@PathVariable Long id) {
        return ApiResponse.ok(profileService.getOne(id));
    }

    @Authorized
    @PutMapping
    public ApiResponse<ApplicantProfileDto> update(@RequestBody ApplicantProfileVo profile) {
        return ApiResponse.ok(profileService.update(profile));
    }

    @GetMapping("/user")
    public ApiResponse<ApplicantProfileVo> getOneByUserId(@RequestParam String userId) {
        return ApiResponse.ok(profileService.getOneByUserId(userId));
    }

}
