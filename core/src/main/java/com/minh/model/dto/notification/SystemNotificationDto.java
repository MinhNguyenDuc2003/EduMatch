package com.minh.model.dto.notification;

import com.minh.enumeration.notification.NotificationTopicEnum;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemNotificationDto {

    private String userId;

    private Long userNotificationId;

    private Boolean isRead;

    private String referenceType;

    private Long referenceId;

    private NotificationTopicEnum topic;

    private String title;

    private String content;

    private String slug;
}
