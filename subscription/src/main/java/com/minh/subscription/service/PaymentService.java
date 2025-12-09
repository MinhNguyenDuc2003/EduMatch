package com.minh.subscription.service;

import com.minh.model.dto.subscription.MonthlyRevenueDto;
import com.minh.model.dto.subscription.PaymentDto;
import com.minh.model.dto.subscription.RevenueByUserTypeDto;
import com.minh.subscription.data.vo.PaymentVo;

import java.util.List;

public interface PaymentService {

    List<PaymentVo> getAll();

    PaymentVo getById(Long id);

    PaymentDto create(PaymentDto payment);

    PaymentDto update(PaymentDto payment);

    void delete(Long id);

    PaymentDto markAsPaid(String transactionId, Long subscriptionPlanId);

    PaymentDto extendSubscription(Long subscriptionPlanId, String transactionId);

    List<MonthlyRevenueDto> getMonthlyRevenue();

    List<RevenueByUserTypeDto> getRevenueByUserType();

    List<MonthlyRevenueDto> getRevenueByMonth();

    List<PaymentVo> getOrderHistoryForUser();
}
