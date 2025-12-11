package com.minh.scholarship.feign;

import com.minh.model.ApiResponse;
import com.minh.scholarship.data.vo.ScholarshipVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "SCHOLARSHIP", path = "/scholarship", contextId = "scholarship-feign-client", configuration = FeignInterceptorConfig.class)
public interface ScholarshipFeign {

    @GetMapping("/scholarships/{id}")
    ApiResponse<ScholarshipVo> getById(@PathVariable Long id);

}
