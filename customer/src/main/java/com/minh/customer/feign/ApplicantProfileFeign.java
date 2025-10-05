package com.minh.customer.feign;

import com.minh.customer.data.vo.ApplicantProfileVo;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "PROFILE", path = "/profile", contextId = "customer-feign-client", configuration = FeignInterceptorConfig.class)
public interface ApplicantProfileFeign {

    @GetMapping("/applicants/user")
    ApiResponse<ApplicantProfileVo> getOneByUserId(@RequestParam String userId);

    @PostMapping("/applicants")
    ApiResponse<ApplicantProfileDto> create(@RequestBody ApplicantProfileVo profile);

    @PostMapping("/applicants")
    ApiResponse<ApplicantProfileDto> update(@RequestBody ApplicantProfileVo profile);

}
