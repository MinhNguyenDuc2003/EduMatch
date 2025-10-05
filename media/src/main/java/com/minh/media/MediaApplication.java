package com.minh.media;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients("com.minh.media.feign")
@EntityScan("com.minh.media.data.entity")
@EnableJpaRepositories("com.minh.media.data.repository")
@ComponentScan(basePackages = {
        "com.minh.media.service",
        "com.minh.config",
        "com.minh.media.data",
        "com.minh.media.data.mapper",
        "com.minh.media.controller",
        "com.minh.service",
        "com.minh.media.message",
        "com.minh.media.configuration",
        "com.minh.media.utils",
})
public class MediaApplication {
    public static void main(String[] args) {
        SpringApplication.run(MediaApplication.class, args);
    }
}
