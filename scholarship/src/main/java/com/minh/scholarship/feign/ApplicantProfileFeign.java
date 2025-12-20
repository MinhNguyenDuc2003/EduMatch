package com.minh.scholarship.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ApplicantPreferenceDto;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.data.vo.ApplicantProfileVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "PROFILE", path = "/profile", contextId = "applicant-feign-client", configuration = FeignInterceptorConfig.class)
public interface ApplicantProfileFeign {

    @GetMapping("applicants/user")
    ApiResponse<ApplicantProfileVo> getOneByUserId(@RequestParam String userId);

    @GetMapping("applicants/{id}")
    ApiResponse<ApplicantProfileVo> getOne(@PathVariable Long id);

    @GetMapping("applicants/all")
    ApiResponse<List<ApplicantProfileDto>> getAll();

    @PostMapping("applicants/filter")
    ApiResponse<List<ApplicantProfileVo>> getByFilter(@RequestBody ScholarshipDto scholarshipDto);

    @GetMapping("applicants/preference/{id}")
    ApiResponse<List<ApplicantPreferenceDto>> getPreferencesById(@PathVariable Long id);

    @GetMapping("applicants/total-weight")
    ApiResponse<Double> getTotalWeight(@RequestParam Long profileId);

}
