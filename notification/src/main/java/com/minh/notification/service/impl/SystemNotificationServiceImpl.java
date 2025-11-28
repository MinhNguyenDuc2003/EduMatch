package com.minh.notification.service.impl;

import com.minh.model.dto.notification.SystemNotificationDto;
import com.minh.notification.data.entity.SystemNotificationEntity;
import com.minh.notification.data.mapper.SystemNotificationMapper;
import com.minh.notification.data.repository.SystemNotificationRepository;
import com.minh.notification.data.vo.NotificationVo;
import com.minh.notification.service.SystemNotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemNotificationServiceImpl implements SystemNotificationService {

    private final SystemNotificationRepository systemNotificationRepository;
    private final SystemNotificationMapper systemNotificationMapper;

    @Transactional(rollbackOn = Exception.class)
    @Override
    public void createFromVo(NotificationVo vo) {

        SystemNotificationEntity entity = SystemNotificationEntity.builder()
                .userId(vo.getUserId())
                .userNotificationId(vo.getUserNotificationId())
                .isRead(vo.getIsRead())
                .referenceType(vo.getReferenceType())
                .referenceId(vo.getReferenceId())
                .topic(vo.getTopic())
                .title(vo.getTitle())
                .content(vo.getContent())
                .slug(vo.getSlug())
                .build();

        systemNotificationRepository.save(entity);
    }

    @Override
    public List<SystemNotificationDto> getAll() {
        List<SystemNotificationEntity> entities = systemNotificationRepository.findAll();
        return systemNotificationMapper.toDto(entities);
    }
}
