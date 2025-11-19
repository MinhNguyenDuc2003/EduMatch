package com.minh.subscription.service;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.model.dto.subscription.SubscriptionDto;
import java.util.List;

public interface SubscriptionService {
    List<SubscriptionDto> getAll();
    SubscriptionDto getById(Long id);
    SubscriptionDto create(SubscriptionDto subscription);
    SubscriptionDto update(SubscriptionDto subscription);
    void delete(Long id);
    List<SubscriptionDto> getCurrentSubscriptionByUser();
    List<SubscriptionDto> getAllSubscriptionsByUserId(String userId);
}
