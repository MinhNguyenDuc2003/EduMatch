package com.minh.notification.configuration;

import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

public class CustomHandshakeHandler extends DefaultHandshakeHandler {

    @Override
    protected Principal determineUser(org.springframework.http.server.ServerHttpRequest request,
                                      org.springframework.web.socket.WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        Principal user = (Principal) attributes.get("user");
        if (user != null) {
            return user;
        }
        String anonymous = "anon-" + UUID.randomUUID();
        return () -> anonymous;
    }
}
