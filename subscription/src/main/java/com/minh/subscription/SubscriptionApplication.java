package com.minh.subscription;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.client.RestTemplate;

import javax.sql.DataSource;
import java.time.Duration;

@SpringBootApplication
@EnableFeignClients("com.minh.subscription.feign")
@EntityScan("com.minh.subscription.data.entity")
@EnableJpaRepositories("com.minh.subscription.data.repository")
@ComponentScan(basePackages = {
        "com.minh.subscription.service",
        "com.minh.config",
        "com.minh.subscription.data",
        "com.minh.subscription.data.mapper",
        "com.minh.subscription.controller",
        "com.minh.service",
        "com.minh.subscription.message",
        "com.minh.subscription.configuration",
})
@Slf4j
public class SubscriptionApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubscriptionApplication.class, args);
    }

    @Autowired
    private Environment env;

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, true);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplateBuilder()
                .setConnectTimeout(Duration.ofMillis(300000))
                .setReadTimeout(Duration.ofMillis(300000))
                .build();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void afterStartup() {
        log.info(">>> -------------------------------");
        log.info(">>> Application is running");
        log.info(">>> Port        : " + env.getProperty("server.port"));
        log.info(">>> Profile     : " + env.getProperty("spring.profiles.active"));
        log.info(">>> Database connection : " + env.getProperty("spring.datasource.jdbc-url"));
        log.info(">>> -------------------------------");
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        DataSourceBuilder ds = DataSourceBuilder.create();
        return ds.build();
    }
}
