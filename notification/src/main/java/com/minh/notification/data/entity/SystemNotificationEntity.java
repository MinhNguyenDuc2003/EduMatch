package com.minh.notification.data.entity;

import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.notification.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "notification", name = "SYSTEM_NOTIFICATION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemNotificationEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "USER_NOTIFICATION_ID")
    private Long userNotificationId;

    @Column(name = "IS_READ")
    private Boolean isRead;

    @Column(name = "REFERENCE_TYPE")
    private String referenceType;

    @Column(name = "REFERENCE_ID")
    private Long referenceId;

    @Enumerated(EnumType.STRING)
    @Column(name = "TOPIC")
    private NotificationTopicEnum topic;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(unique = true)
    private String slug;
}
