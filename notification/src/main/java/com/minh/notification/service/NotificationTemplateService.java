package com.minh.notification.service;

import com.minh.model.dto.notification.NotificationTemplateDto;

public interface NotificationTemplateService {

    NotificationTemplateDto getByType(String type);

}
