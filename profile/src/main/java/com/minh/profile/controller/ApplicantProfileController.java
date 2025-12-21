package com.minh.profile.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ApplicantPreferenceDto;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.model.dto.profile.CountryRegisterStatisticDto;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.profile.data.vo.ApplicantProfileVo;
import com.minh.profile.service.ApplicantProfileService;
import com.minh.service.aspect.Authorized;
import com.minh.utils.UaaContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all")
    public ApiResponse<List<ApplicantProfileDto>> getAll() {
        return ApiResponse.ok(profileService.getAll());
    }

    @Authorized
    @GetMapping("/all/my-profile")
    public ApiResponse<List<ApplicantProfileVo>> getAllMyProfile() {
        return ApiResponse.ok(profileService.getAllMyProfile(UaaContextHolder.getUserId()));
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

    @GetMapping("/by-type")
    public ApiResponse<List<ApplicantProfileVo>> getAllByType(@RequestParam String type) {
        return ApiResponse.ok(profileService.getAllByType(type));
    }

    @Authorized
    @GetMapping("/by-user-and-type")
    public ApiResponse<List<ApplicantProfileVo>> getAllByUserAndType(
            @RequestParam String type
    ) {
        return ApiResponse.ok(profileService.getAllByUserIdAndType(type));
    }

    @PostMapping("/filter")
    public ApiResponse<List<ApplicantProfileVo>> filter(@RequestBody ScholarshipDto scholarshipDto) {
        return ApiResponse.ok(profileService.getByScholarshipFilter(scholarshipDto));
    }

    @GetMapping("/preference/{id}")
    public ApiResponse<List<ApplicantPreferenceDto>> getPreferencesById(@PathVariable Long id) {
        return ApiResponse.ok(profileService.getPreferencesById(id));
    }

    @GetMapping("/top-country")
    public ApiResponse<List<CountryRegisterStatisticDto>> getTopCountryRegister() {
        return ApiResponse.ok(profileService.getTop5CountryRegister());
    }

    @GetMapping("/total-weight")
    public ApiResponse<Double> getTotalWeight(@RequestParam Long profileId) {
        return ApiResponse.ok(profileService.getTotalWeightByProfileId(profileId));
    }

}
