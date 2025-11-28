package com.minh.notification.data.repository;

import com.minh.notification.data.entity.SystemNotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemNotificationRepository extends JpaRepository<SystemNotificationEntity, Long> {
}
