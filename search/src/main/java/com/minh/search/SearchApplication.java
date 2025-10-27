package com.minh.search;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

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
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class SearchApplication {
    public static void main(String[] args) {
        SpringApplication.run(SearchApplication.class, args);
    }
}
