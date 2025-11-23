package com.minh.notification.message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.model.dto.notification.UserNotificationDto;
import com.minh.notification.data.vo.NotificationVo;
import com.minh.notification.service.UserNotificationService;
import com.minh.notification.service.UserSubscriptionService;
import com.minh.notification.service.helper.NotificationWebSocketHandler;
import com.minh.service.base.BaseService;
import com.minh.service.concurency.ThreadFactoryBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadFactory;

@Log4j2
@Service
@RequiredArgsConstructor
public class KafkaConsumer extends BaseService {

    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;
    private final NotificationWebSocketHandler notificationWebSocketHandler;
    private final UserNotificationService userNotificationService;
    private final UserSubscriptionService userSubscriptionService;

    @Value("${kafka.scholarship.new-event.topic}")
    private String newEventScholarshipTopic;

    @KafkaListener(topics = "${kafka.scholarship.new-event.topic}", groupId = "${kafka.scholarship.new-event.group}", containerFactory = "kafkaListenerContainerFactory")
    public void receiveNewEventScholarship(byte[] message) throws JsonProcessingException {
        String messageStr = new String(message);
        NotificationVo notificationVo = objectMapper.readValue(messageStr, NotificationVo.class);
        ThreadFactoryBuilder threadFactoryBuilder = new ThreadFactoryBuilder();
        ThreadFactory threadFactory = threadFactoryBuilder.build();
        Thread thread = threadFactory.newThread(() -> {
            UserNotificationDto notification = UserNotificationDto.builder()
                    .referenceId(notificationVo.getReferenceId())
                    .referenceType(notificationVo.getReferenceType())
                    .isRead(false)
                    .content(notificationVo.getContent())
                    .slug(notificationVo.getSlug())
                    .notificationId(notificationVo.getUserNotificationId())
                    .userId(notificationVo.getUserId()).build();
            userNotificationService.createOne(notification);
            List<String> userFollowerTopics = userSubscriptionService.getUserFollowerTopics(notificationVo.getUserId());
            userFollowerTopics.forEach(userFollowerTopic -> {
                notificationWebSocketHandler.sendToUser(userFollowerTopic, notificationVo);
            });
        });
        thread.start();
    }

    @KafkaListener(topics = "${kafka.news.new-event.topic}", groupId = "${kafka.news.new-event.group}", containerFactory = "kafkaListenerContainerFactory")
    public void receiveNewEventNews(byte[] message) throws JsonProcessingException {
        String messageStr = new String(message);
        NotificationVo notificationVo = objectMapper.readValue(messageStr, NotificationVo.class);
        ThreadFactoryBuilder threadFactoryBuilder = new ThreadFactoryBuilder();
        ThreadFactory threadFactory = threadFactoryBuilder.build();
        Thread thread = threadFactory.newThread(() -> {
            UserNotificationDto notification = UserNotificationDto.builder()
                    .referenceId(notificationVo.getReferenceId())
                    .referenceType(notificationVo.getReferenceType())
                    .isRead(false)
                    .content(notificationVo.getContent())
                    .slug(notificationVo.getSlug())
                    .notificationId(notificationVo.getUserNotificationId())
                    .userId(notificationVo.getUserId()).build();
            userNotificationService.createOne(notification);
            List<String> userFollowerTopics = userSubscriptionService.getUserFollowerTopics(notificationVo.getUserId());
            userFollowerTopics.forEach(userFollowerTopic -> {
                notificationWebSocketHandler.sendToUser(userFollowerTopic, notificationVo);
            });
        });
        thread.start();
    }

    @KafkaListener(topics = "${kafka.application.update-status.topic}", groupId = "${kafka.application.update-status.group}", containerFactory = "kafkaListenerContainerFactory")
    public void receiveUpdateEventApplication(byte[] message) throws JsonProcessingException {
        sendNotificationToUser(message);
    }

    @KafkaListener(topics = "${kafka.provider.application.topic}", groupId = "${kafka.provider.application.group}", containerFactory = "kafkaListenerContainerFactory")
    public void receiveNewApplicationScholarship(byte[] message) throws JsonProcessingException {
        sendNotificationToUser(message);
    }

    @KafkaListener(topics = "${kafka.scholarship.referral-event.topic}", groupId = "${kafka.scholarship.referral-event.group}", containerFactory = "kafkaListenerContainerFactory")
    public void receiveReferralApplicationScholarship(byte[] message) throws JsonProcessingException {
        sendNotificationToUser(message);
    }

    private void sendNotificationToUser(byte[] message) throws JsonProcessingException {
        String messageStr = new String(message);
        NotificationVo notificationVo = objectMapper.readValue(messageStr, NotificationVo.class);
        ThreadFactoryBuilder threadFactoryBuilder = new ThreadFactoryBuilder();
        ThreadFactory threadFactory = threadFactoryBuilder.build();
        Thread thread = threadFactory.newThread(() -> {
            UserNotificationDto notification = UserNotificationDto.builder()
                    .referenceId(notificationVo.getReferenceId())
                    .referenceType(notificationVo.getReferenceType())
                    .isRead(false)
                    .content(notificationVo.getContent())
                    .slug(notificationVo.getSlug())
                    .notificationId(notificationVo.getUserNotificationId())
                    .userId(notificationVo.getUserId()).build();
            userNotificationService.createOne(notification);
            notificationWebSocketHandler.sendToUser(notificationVo.getUserId(), notificationVo);
        });
        thread.start();
    }

}
