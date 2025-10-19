package com.minh.service.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
@Slf4j
public class SystemTokenProvider {

    @Value("${keycloak.auth-server-url}")
    private String authServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.resource}")
    private String clientId;

    @Value("${keycloak.credentials.secret}")
    private String clientSecret;

    private String cachedToken;
    private long expiresAt;

    public synchronized String getAccessToken() {
        if (cachedToken == null || System.currentTimeMillis() > expiresAt) {
            refreshToken();
        }
        return cachedToken;
    }

    private void refreshToken() {
        try {
            String tokenUrl = authServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";
            var body = "grant_type=client_credentials"
                    + "&client_id=" + clientId
                    + "&client_secret=" + clientSecret;

            var response = HttpClient.newHttpClient().send(
                    HttpRequest.newBuilder()
                            .uri(URI.create(tokenUrl))
                            .header("Content-Type", "application/x-www-form-urlencoded")
                            .POST(HttpRequest.BodyPublishers.ofString(body))
                            .build(),
                    HttpResponse.BodyHandlers.ofString()
            );

            System.out.println("Keycloak token response:" + response.body());

            var json = new ObjectMapper().readTree(response.body());
            cachedToken = json.get("access_token").asText();
            int expiresIn = json.get("expires_in").asInt();
            expiresAt = System.currentTimeMillis() + (expiresIn - 30) * 1000L;
        } catch (Exception e) {
            throw new IllegalStateException("Cannot get service token", e);
        }
    }

}
