package com.minh.customer.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.SubscriptionDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "SUBSCRIPTION", path = "/subscription", contextId = "subscription-feign-client", configuration = FeignInterceptorConfig.class)
public interface SubscriptionFeign {

    @GetMapping("/subscriptions/current")
    ApiResponse<List<SubscriptionDto>> getCurrentSubscription();

}
