package com.minh.notification.controller;

import com.minh.constants.EndPoint;
import com.minh.notification.data.vo.NotificationVo;
import com.minh.notification.service.helper.NotificationWebSocketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.NOTIFICATION.NOTIFICATION_CONNECTS)
@Slf4j
public class NotificationController {

    private final NotificationWebSocketHandler notificationWebSocketHandler;

    @MessageMapping("/send")
    public void handleMessage(@AuthenticationPrincipal Jwt jwt, NotificationVo msg) {
        String userId = jwt.getSubject();
        log.info("User {} sent message {}", userId, msg);
    }

    @MessageMapping("/notify")
    public void notifyAll(@Payload NotificationVo notification) {
        notificationWebSocketHandler.sendToGlobal(notification);
    }


}
