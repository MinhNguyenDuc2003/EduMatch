package com.minh.subscription.service;

import com.minh.model.dto.subscription.SubscriptionPlanDto;

import java.util.List;

public interface SubscriptionPlanService {
    List<SubscriptionPlanDto> getAll();

    SubscriptionPlanDto getById(Long id);

    SubscriptionPlanDto create(SubscriptionPlanDto subscriptionPlan);

    SubscriptionPlanDto update(SubscriptionPlanDto subscriptionPlan);

    void delete(Long id);
}
