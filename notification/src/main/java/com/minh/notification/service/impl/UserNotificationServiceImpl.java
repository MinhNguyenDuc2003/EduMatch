package com.minh.notification.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.notification.UserNotificationDto;
import com.minh.notification.data.entity.UserNotificationEntity;
import com.minh.notification.data.mapper.UserNotificationMapper;
import com.minh.notification.data.repository.UserNotificationRepository;
import com.minh.notification.service.UserNotificationService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public UserNotificationDto updateReadStatus(Long id) {
        Optional<UserNotificationEntity> notification = userNotificationRepository.findById(id);
        if (notification.isEmpty()) {
            throw new BusinessException(CoreMessageCode.NOTIFICATION_IS_NOT_EXIST);
        }
        notification.get().setIsRead(true);
        userNotificationRepository.save(notification.get());
        return userNotificationMapper.toDto(notification.get());
    }

}
