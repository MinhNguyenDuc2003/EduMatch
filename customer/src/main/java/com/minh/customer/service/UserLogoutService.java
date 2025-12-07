package com.minh.customer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserLogoutService {

    @Value("${keycloak.auth-server-url}")
    private String authServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.resource}")
    private String clientId;

    public String buildLogoutUrl(String postLogoutRedirectUri) {
        return authServerUrl + "/realms/" + realm + "/protocol/openid-connect/logout" +
                "?post_logout_redirect_uri=" + URLEncoder.encode(postLogoutRedirectUri, StandardCharsets.UTF_8) +
                "&client_id=" + clientId;
    }

    public String buildLogoutUrl() {
        return buildLogoutUrl("http://159.89.200.244/edufront/home");
    }

}
