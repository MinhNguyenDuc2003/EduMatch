package com.minh.scholarship.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.scholarship.data.vo.ProviderProfileVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "PROFILE", path = "/profile", contextId = "provider-feign-client", configuration = FeignInterceptorConfig.class)
public interface ProviderProfileFeign {

    @GetMapping("/providers/{id}")
    ApiResponse<ProviderProfileVo> getOne(@PathVariable Long id);

    @PostMapping(value = "/providers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<ProviderProfileDto> create(
            @RequestPart("profile") String profile,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            @RequestPart(value = "banner", required = false) MultipartFile banner
    );

    @PutMapping("/providers")
    ApiResponse<ProviderProfileDto> update(
            @RequestPart("profile") String profile,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            @RequestPart(value = "banner", required = false) MultipartFile banner
    );

    @GetMapping("/providers/my-info")
    ApiResponse<ProviderProfileVo> getMyProviderInfo();
}
