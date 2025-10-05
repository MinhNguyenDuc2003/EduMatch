package com.minh.media.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsS3Config {

    @Bean
    public S3Client s3Client() {
        String region = System.getenv("AWS_DEFAULT_REGION");
        return S3Client.builder()
                .region(Region.of(region))
                .build();
    }

}
