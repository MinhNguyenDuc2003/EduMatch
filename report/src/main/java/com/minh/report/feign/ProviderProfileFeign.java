package com.minh.report.feign;

import com.minh.model.ApiResponse;
import com.minh.report.vo.ProviderProfileVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "PROFILE",
        path = "/profile",
        contextId = "provider-feign-client",
        configuration = FeignInterceptorConfig.class
)
public interface ProviderProfileFeign {

    // ✔ Chỉ cần hàm này để load Provider Profile theo Id
    @GetMapping("/providers/{id}")
    ApiResponse<ProviderProfileVo> getOne(@PathVariable Long id);
}
