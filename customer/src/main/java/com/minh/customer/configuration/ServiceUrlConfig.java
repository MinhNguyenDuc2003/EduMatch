package com.minh.customer.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "edu.services")
public record ServiceUrlConfig(
        String location) {
}
