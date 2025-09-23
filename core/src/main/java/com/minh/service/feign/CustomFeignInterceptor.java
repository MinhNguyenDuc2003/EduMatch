package com.minh.service.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Slf4j
public class CustomFeignInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes servletRequestAttribute =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        assert servletRequestAttribute != null;
        String authHeader = servletRequestAttribute.getRequest().getHeader("Authorization");
        if (StringUtils.hasText(authHeader))
            template.header("Authorization", authHeader);
    }
}
