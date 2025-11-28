package com.minh.notification.service;

import com.minh.model.dto.notification.SystemNotificationDto;
import com.minh.notification.data.vo.NotificationVo;

import java.util.List;

public interface SystemNotificationService {
    void createFromVo(NotificationVo vo);

    List<SystemNotificationDto> getAll();
}
