package com.minh.notification.data.repository;

import com.minh.notification.data.entity.NotificationTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationTemplateRepository extends JpaRepository<NotificationTemplateEntity, Long> {

    Optional<NotificationTemplateEntity> findByType(String type);

}
