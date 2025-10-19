package com.minh.service.feign;

import feign.Feign;
import feign.RequestInterceptor;
import feign.Retryer;
import feign.codec.Encoder;
import feign.codec.ErrorDecoder;
import feign.form.spring.SpringFormEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;

@Configuration
@RequiredArgsConstructor
public class FeignInterceptorConfig {

    private final CustomFeignInterceptor customFeignInterceptor;
    private final SystemFeignInterceptor systemFeignInterceptor;

    @Bean
    public Retryer retryer() {
        return new FeignRetryer(5, 1000L);
    }

    @Bean
    public RequestInterceptor getRequestInterceptor() {
        if (RequestContextHolder.getRequestAttributes() != null) {
            return customFeignInterceptor;
        }
        return systemFeignInterceptor;
    }

    @Bean
    public ErrorDecoder errorDecoder() {
        return new FeignErrorDecoder();
    }

    @Bean
    @Primary
    public Feign.Builder feignBuilder() {
        return Feign.builder()
                .requestInterceptor(getRequestInterceptor())
                .retryer(retryer());
    }

    @Bean
    public Encoder multipartFormEncoderfeignEncoder() {
        return new SpringFormEncoder(new SpringEncoder(() -> new HttpMessageConverters(new RestTemplate().getMessageConverters())));
    }
}
