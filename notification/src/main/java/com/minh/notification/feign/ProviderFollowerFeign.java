package com.minh.notification.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.service.feign.FeignInterceptorConfig;
import com.minh.service.feign.SystemFeignInterceptor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "PROFILE", path = "/profile", contextId = "applicant-feign-client", configuration = FeignInterceptorConfig.class)
public interface ProviderFollowerFeign {

    @GetMapping("followers/all")
    ApiResponse<List<ProviderFollowerDto>> getAllFollowers(@RequestParam("userId") String userId);

    @GetMapping("followers/providers")
    ApiResponse<List<ProviderFollowerDto>> getAllProviders();

}
