package com.minh.notification.service.impl;

import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.notification.service.UserSubscriptionService;
import com.minh.notification.service.factory.UserTopicFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserSubscriptionServiceImpl implements UserSubscriptionService {

    @Autowired
    private UserTopicFactory userTopicFactory;

    @Override
    public List<String> getUserFollowerTopics(String userId) {
        return userTopicFactory.getUserTopicService(NotificationTopicEnum.PROVIDER_FOLLOWER).getUserTopics(userId);
    }

    @Override
    public List<String> getAllFollowTopics() {
        List<String> topics = new ArrayList<>();
        for (NotificationTopicEnum topic : NotificationTopicEnum.values()) {
            topics.addAll(userTopicFactory.getUserTopicService(topic).getAllTopicsFollow());
        }
        return topics;
    }

}
