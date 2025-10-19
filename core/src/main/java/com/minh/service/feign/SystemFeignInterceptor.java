package com.minh.service.feign;

import com.minh.service.security.SystemTokenProvider;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(2)
@RequiredArgsConstructor
public class SystemFeignInterceptor implements RequestInterceptor {

    private final SystemTokenProvider systemTokenProvider;

    @Override
    public void apply(RequestTemplate template) {
        String token = systemTokenProvider.getAccessToken();
        template.header("Authorization", "Bearer " + token);
    }
}

