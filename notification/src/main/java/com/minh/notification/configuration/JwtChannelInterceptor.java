package com.minh.notification.configuration;

import com.minh.service.security.CustomJwtGrantedAuthoritiesConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@RequiredArgsConstructor
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;
    private final CustomJwtGrantedAuthoritiesConverter authoritiesConverter;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                try {
                    Jwt jwt = jwtDecoder.decode(token);
                    var authorities = authoritiesConverter.convert(jwt);

                    String userId = jwt.getSubject();
                    System.out.println("🔌 WebSocket CONNECT - userId = " + userId);

                    AbstractAuthenticationToken authentication = getAbstractAuthenticationToken(authorities, jwt);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    accessor.setUser(authentication);
                } catch (Exception e) {
                    throw new IllegalArgumentException("Invalid JWT token", e);
                }
            }
        }
        return message;
    }

    private static AbstractAuthenticationToken getAbstractAuthenticationToken(Collection<GrantedAuthority> authorities, Jwt jwt) {
        AbstractAuthenticationToken authentication =
                new AbstractAuthenticationToken(authorities) {
                    @Override
                    public Object getCredentials() {
                        return jwt.getTokenValue();
                    }

                    @Override
                    public Object getPrincipal() {
                        return jwt.getSubject();
                    }

                    @Override
                    public String getName() {
                        return jwt.getSubject();
                    }
                };
        authentication.setAuthenticated(true);
        return authentication;
    }
}
