package com.minh.notification.service;

import java.util.List;

public interface UserSubscriptionService {

    List<String> getUserFollowerTopics(String userId);

    List<String> getAllFollowTopics();
}
