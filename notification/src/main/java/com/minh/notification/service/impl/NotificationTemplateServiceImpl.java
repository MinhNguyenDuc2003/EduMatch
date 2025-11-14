package com.minh.notification.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.notification.data.mapper.NotificationTemplateMapper;
import com.minh.notification.data.repository.NotificationTemplateRepository;
import com.minh.notification.service.NotificationTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationTemplateServiceImpl implements NotificationTemplateService {

    @Autowired
    private NotificationTemplateRepository notificationTemplateRepository;
    @Autowired
    private NotificationTemplateMapper notificationTemplateMapper;

    @Override
    public NotificationTemplateDto getByType(String type) {
        return notificationTemplateMapper.toDto(notificationTemplateRepository
                .findByType(type)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.NOTIFICATION_TEMPLATE_TYPE_NOT_FOUND)));
    }

    @Override
    public NotificationTemplateDto saveOne(NotificationTemplateDto notificationTemplateDto) {
        return notificationTemplateMapper.toDto(notificationTemplateRepository.save(notificationTemplateMapper.toEntity(notificationTemplateDto)));
    }

}
