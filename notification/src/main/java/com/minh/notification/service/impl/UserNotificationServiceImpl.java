package com.minh.notification.service.impl;

import com.minh.model.dto.notification.UserNotificationDto;
import com.minh.notification.data.mapper.UserNotificationMapper;
import com.minh.notification.data.repository.UserNotificationRepository;
import com.minh.notification.service.UserNotificationService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserNotificationServiceImpl implements UserNotificationService {

    @Autowired
    private UserNotificationMapper userNotificationMapper;
    @Autowired
    private UserNotificationRepository userNotificationRepository;

    @Transactional(rollbackOn = Exception.class)
    @Override
    public UserNotificationDto createOne(UserNotificationDto userNotificationDto) {
        return userNotificationMapper.toDto(userNotificationRepository.save(userNotificationMapper.toEntity(userNotificationDto)));
    }

    @Transactional(rollbackOn = Exception.class)
    @Override
    public List<UserNotificationDto> createAll(List<UserNotificationDto> userNotificationDto) {
        return userNotificationMapper.toDto(userNotificationRepository.saveAll(userNotificationMapper.toEntity(userNotificationDto)));
    }

    @Override
    public List<UserNotificationDto> getByUser() {
        return userNotificationMapper.toDto(userNotificationRepository.findAllByUserIdOrIsAdminOrderByCreatedDateDesc(UaaContextHolder.getUserId(), true));
    }

    @Override
    public List<UserNotificationDto> getAllSystem() {
        return userNotificationMapper.toDto(userNotificationRepository.findAllByIsAdmin(true));
    }
}
