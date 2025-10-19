package com.minh.notification.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.enumeration.notification.NotificationTopicEnum;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationVo {

    private String userId;

    private Long userNotificationId;

    private Boolean isRead;

    private String referenceType;

    private Long referenceId;

    private NotificationTopicEnum topic;

    private String title;

    private String content;

}
