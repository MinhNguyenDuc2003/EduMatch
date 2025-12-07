package com.minh.subscription.service;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.model.dto.subscription.SubscriptionPlanDto;

import java.util.List;

public interface SubscriptionPlanService {
    List<SubscriptionPlanDto> getAll();

    SubscriptionPlanDto getById(Long id);

    SubscriptionPlanDto create(SubscriptionPlanDto subscriptionPlan);

    SubscriptionPlanDto update(SubscriptionPlanDto subscriptionPlan);

    void delete(Long id);

    List<SubscriptionPlanDto> getByTargetType(SubscriptionTargetType targetType);

}
