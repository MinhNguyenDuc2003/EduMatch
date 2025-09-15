package com.minh.profile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients("com.minh.profile.feign")
@EntityScan("com.minh.profile.data.entity")
@EnableJpaRepositories("com.minh.profile.data.repository")
@ComponentScan(basePackages = {
        "com.minh.profile.service",
        "com.minh.config",
        "com.minh.profile.data",
        "com.minh.profile.data.mapper",
        "com.minh.profile.controller",
        "com.minh.service",
        "com.minh.profile.message",
        "com.minh.profile.configuration",
})
public class ProfileApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProfileApplication.class, args);
    }
}
