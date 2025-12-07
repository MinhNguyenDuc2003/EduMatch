package com.minh.notification.data.entity;

import com.minh.notification.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "notification", name = "USER_NOTIFICATION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class UserNotificationEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOTIFICATION_ID")
    private Long notificationId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "IS_READ")
    private Boolean isRead;

    @Column(name = "REFERENCE_TYPE")
    private String referenceType;

    @Column(name = "REFERENCE_ID")
    private Long referenceId;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "SLUG")
    private String slug;

    @Column(name = "IS_ADMIN")
    private Boolean isAdmin;

}
