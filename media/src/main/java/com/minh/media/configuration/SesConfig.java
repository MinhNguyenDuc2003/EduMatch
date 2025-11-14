package com.minh.media.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;

@Configuration
public class SesConfig {

    @Bean
    public SesClient sesClient() {
        String region = System.getenv("AWS_DEFAULT_REGION");
        return SesClient.builder()
                .region(Region.of(region))
                .build();
    }

}
