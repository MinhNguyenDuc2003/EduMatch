package com.minh.search.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "spring.elasticsearch")
@Configuration
@Data
public class ElasticsearchDataConfig {
    private String uris;
    private String username;
    private String password;
}
