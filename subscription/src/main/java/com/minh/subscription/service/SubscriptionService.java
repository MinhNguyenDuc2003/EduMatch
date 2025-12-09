package com.minh.subscription.service;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.model.dto.subscription.SubscriptionDto;
import com.minh.subscription.data.vo.SubscriptionVo;

import java.util.List;

public interface SubscriptionService {
    List<SubscriptionVo> getAll();
    SubscriptionVo getById(Long id);
    SubscriptionDto create(SubscriptionDto subscription);
    SubscriptionDto update(SubscriptionDto subscription);
    void delete(Long id);
    SubscriptionVo getCurrentSubscriptionByUser();
    List<SubscriptionVo> getAllSubscriptionsByUserId(String userId);
    Boolean sendMailExpiredDate5DaysLeft();
}
