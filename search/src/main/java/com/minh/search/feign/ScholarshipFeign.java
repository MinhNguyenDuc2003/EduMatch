package com.minh.search.feign;

import com.minh.model.ApiResponse;
import com.minh.search.data.vo.ScholarshipResponseVo;
import com.minh.search.data.vo.ScholarshipVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "SCHOLARSHIP", path = "/scholarship", contextId = "scholarship-feign-client", configuration = FeignInterceptorConfig.class)
public interface ScholarshipFeign {

    @GetMapping("/scholarships/{id}")
    ApiResponse<ScholarshipResponseVo> getById(@PathVariable Long id);

    @GetMapping("/scholarships/{id}/all")
    ApiResponse<ScholarshipResponseVo> getByIdAll(@PathVariable Long id);

    @PostMapping("/scholarships/ids")
    ApiResponse<List<ScholarshipVo>> getByIds(@RequestBody List<Long> ids);

}
