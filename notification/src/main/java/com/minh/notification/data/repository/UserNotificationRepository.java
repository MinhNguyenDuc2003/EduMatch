package com.minh.notification.data.repository;

import com.minh.notification.data.entity.UserNotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotificationEntity, Long> {
    List<UserNotificationEntity> findAllByUserId(String userId);

    List<UserNotificationEntity> findAllByIsAdmin(Boolean isAdmin);

    List<UserNotificationEntity> findAllByUserIdOrIsAdmin(String userId, boolean b);

    List<UserNotificationEntity> findAllByUserIdOrIsAdminOrderByCreatedDateDesc(String userId, boolean b);
}
