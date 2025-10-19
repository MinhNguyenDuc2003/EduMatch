package com.minh.service.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Slf4j
@Order(1)
public class CustomFeignInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes servletRequestAttribute =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (servletRequestAttribute != null) {
            String authHeader = servletRequestAttribute.getRequest().getHeader("Authorization");
            if (StringUtils.hasText(authHeader))
                template.header("Authorization", authHeader);
        }
    }
}
