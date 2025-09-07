package com.minh.customer;

import com.minh.config.CorsConfig;
import com.minh.customer.configuration.ServiceUrlConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients("com.minh.customer.feign")
@EntityScan("com.minh.customer.data.entity")
@EnableJpaRepositories("com.minh.customer.data.repository")
@ComponentScan(basePackages = {
        "com.minh.customer.service",
        "com.minh.config",
        "com.minh.customer.data",
        "com.minh.customer.data.mapper",
        "com.minh.customer.controller",
        "com.minh.service",
        "com.minh.customer.message",
        "com.minh.customer.configuration",
})
@EnableConfigurationProperties({ServiceUrlConfig.class, CorsConfig.class})
public class CustomerApplication
{
    public static void main( String[] args )
    {
        SpringApplication.run(CustomerApplication.class, args);
    }
}
