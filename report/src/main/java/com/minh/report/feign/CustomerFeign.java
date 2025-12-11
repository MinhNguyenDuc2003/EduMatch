package com.minh.report.feign;

import com.minh.model.ApiResponse;
import com.minh.report.vo.CustomerVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "CUSTOMER", path = "/customer", contextId = "customer-feign-client", configuration = FeignInterceptorConfig.class)
public interface CustomerFeign {

    @GetMapping("customers/profile")
    ApiResponse<CustomerVo> getSimpleCustomerById(@RequestParam String id);

}
