package com.minh.location;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients("com.minh.location.feign")
@EntityScan("com.minh.location.data.entity")
@EnableJpaRepositories("com.minh.location.data.repository")
@ComponentScan(basePackages = {
        "com.minh.location.service",
        "com.minh.config",
        "com.minh.location.data",
        "com.minh.location.data.mapper",
        "com.minh.location.controller",
        "com.minh.service",
        "com.minh.location.message",
        "com.minh.location.configuration",
})
public class LocationApplication
{
    public static void main( String[] args )
    {
        SpringApplication.run(LocationApplication.class, args);
    }
}
