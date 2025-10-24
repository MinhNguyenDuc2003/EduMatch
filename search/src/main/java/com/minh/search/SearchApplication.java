package com.minh.search;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients("com.minh.search.feign")
@ComponentScan(basePackages = {
        "com.minh.search.service",
        "com.minh.config",
        "com.minh.search.data",
        "com.minh.search.data.mapper",
        "com.minh.search.controller",
        "com.minh.service",
        "com.minh.search.message",
        "com.minh.search.configuration",
})
public class SearchApplication {
    public static void main(String[] args) {
        SpringApplication.run(SearchApplication.class, args);
    }
}
