package com.minh.customer.feign;

import com.minh.customer.data.vo.ApplicantProfileVo;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "PROFILE", path = "/profile", contextId = "applicant-feign-client", configuration = FeignInterceptorConfig.class)
public interface ApplicantProfileFeign {

    @GetMapping("/applicants/user")
    ApiResponse<ApplicantProfileVo> getOneByUserId(@RequestParam String userId);

    @PostMapping("/applicants")
    ApiResponse<ApplicantProfileDto> create(@RequestBody ApplicantProfileVo profile);

    @PutMapping("/applicants")
    ApiResponse<ApplicantProfileDto> update(@RequestBody ApplicantProfileVo profile);

}
