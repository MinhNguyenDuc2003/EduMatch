package com.minh.scholarship.feign;

import com.minh.model.ApiResponse;
import com.minh.scholarship.data.vo.ApplicantProfileVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "PROFILE", path = "/profile", contextId = "applicant-feign-client", configuration = FeignInterceptorConfig.class)
public interface ApplicantProfileFeign {

    @GetMapping("applicants/user")
    ApiResponse<ApplicantProfileVo> getOneByUserId(@RequestParam String userId);

    @GetMapping("applicants/{id}")
    ApiResponse<ApplicantProfileVo> getOne(@PathVariable Long id);

}
