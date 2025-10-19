package com.minh.notification.service;

import com.minh.enumeration.notification.NotificationTopicEnum;

import java.util.List;

public interface UserTopicService {

    NotificationTopicEnum getType();

    List<String> getUserTopics(String userId);

    List<String> getAllTopicsFollow();

}
