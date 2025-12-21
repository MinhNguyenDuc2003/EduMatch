package com.minh.service.feign;

import feign.Feign;
import feign.Request;
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

import java.util.concurrent.TimeUnit;

@Configuration
@RequiredArgsConstructor
public class FeignInterceptorConfig {

    @Bean
    public Retryer retryer() {
        return new FeignRetryer(5, 1000L);
    }

    @Bean
    public RequestInterceptor getRequestInterceptor() {
        return new CustomFeignInterceptor();
    }

    @Bean
    public ErrorDecoder errorDecoder() {
        return new FeignErrorDecoder();
    }

    @Bean
    public Request.Options feignRequestOptions() {
        return new Request.Options(
                10, TimeUnit.SECONDS,
                180, TimeUnit.SECONDS,
                true
        );
    }

    @Bean
    @Primary
    public Feign.Builder feignBuilder() {
        return Feign.builder()
                .options(feignRequestOptions())
                .requestInterceptor(getRequestInterceptor())
                .retryer(retryer());
    }

    @Bean
    public Encoder multipartFormEncoderfeignEncoder() {
        return new SpringFormEncoder(new SpringEncoder(() -> new HttpMessageConverters(new RestTemplate().getMessageConverters())));
    }
}
