package com.minh.scholarship;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients("com.minh.scholarship.feign")
@EntityScan("com.minh.scholarship.data.entity")
@EnableJpaRepositories("com.minh.scholarship.data.repository")
@ComponentScan(basePackages = {
        "com.minh.scholarship.service",
        "com.minh.config",
        "com.minh.scholarship.data",
        "com.minh.scholarship.data.mapper",
        "com.minh.scholarship.controller",
        "com.minh.service",
        "com.minh.scholarship.message",
        "com.minh.scholarship.configuration",
})
public class ScholarshipApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScholarshipApplication.class, args);
    }
}
