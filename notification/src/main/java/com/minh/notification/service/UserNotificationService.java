package com.minh.notification.service;

import com.minh.model.dto.notification.UserNotificationDto;

import java.util.List;

public interface UserNotificationService {

    UserNotificationDto createOne(UserNotificationDto userNotificationDto);

    List<UserNotificationDto> createAll(List<UserNotificationDto> userNotificationDto);

    List<UserNotificationDto> getByUser();

    List<UserNotificationDto> getAllSystem();

    UserNotificationDto updateReadStatus(Long id);

}
