package com.minh.subscription.service;

import com.minh.model.dto.subscription.OrderDto;

import java.util.List;

public interface OrderService {

    List<OrderDto> getAll();

    OrderDto getById(Long id);

    OrderDto create(OrderDto payment);

    OrderDto update(OrderDto payment);

    void delete(Long id);

    OrderDto markAsPaid(String transactionId, Long subscriptionPlanId);

    OrderDto extendSubscription(Long subscriptionId, Long subscriptionPlanId, String transactionId);
}
