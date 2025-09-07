package com.minh.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class SecurityUtil {

    public static Jwt getJwtClaims() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            return ((JwtAuthenticationToken) authentication).getToken();
        }
        return null;
    }

    public static Long getCurrentUserId() {
        Jwt jwt = getJwtClaims();
        return (jwt != null) ? Long.valueOf(jwt.getClaimAsString("userId")) : null;
    }

    public static String getCurrentUserName() {
        Jwt jwt = getJwtClaims();
        return (jwt != null) ? jwt.getClaimAsString("username") : null;
    }

    public static List<String> getCurrentRoles() {
        Jwt jwt = getJwtClaims();
        if (jwt == null) {
            return Collections.emptyList();
        }

        List<String> roles = new ArrayList<>();

        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            roles.addAll((Collection<String>) realmAccess.get("roles"));
        }

        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess != null && resourceAccess.containsKey("my-service")) {
            Map<String, Object> clientAccess = (Map<String, Object>) resourceAccess.get("my-service");
            if (clientAccess.containsKey("roles")) {
                roles.addAll((Collection<String>) clientAccess.get("roles"));
            }
        }

        return roles;
    }

}
