package com.minh.notification.service.helper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.notification.data.vo.NotificationVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationWebSocketHandler {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void sendToGlobal(NotificationVo payload) {
        try {
            String msg = objectMapper.writeValueAsString(payload);
            messagingTemplate.convertAndSend("/global/", msg);
        } catch (Exception e) {
            throw new RuntimeException("Error sending to global topic ", e);
        }
    }

    public void sendToUser(String userId, NotificationVo payload) {
        try {
            String msg = objectMapper.writeValueAsString(payload);
            System.out.println("📤 Sending PRIVATE message to userId = " + userId);
            messagingTemplate.convertAndSendToUser(userId, "/queue/private", msg);
        } catch (Exception e) {
            throw new RuntimeException("Error sending to user " + userId, e);
        }
    }

}
