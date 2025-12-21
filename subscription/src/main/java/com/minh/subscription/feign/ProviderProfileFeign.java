package com.minh.subscription.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.service.feign.FeignInterceptorConfig;
import com.minh.subscription.data.vo.ProviderProfileVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(
        name = "PROFILE",
        path = "/profile",
        contextId = "provider-feign-client",
        configuration = FeignInterceptorConfig.class
)
public interface ProviderProfileFeign {

    @GetMapping("/providers/user/{userId}")
    ApiResponse<ProviderProfileVo> getOneByUserId(@PathVariable String userId);
}