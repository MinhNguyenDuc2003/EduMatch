package com.minh.subscription.service;

import com.minh.model.dto.subscription.PaymentDto;

import java.util.List;

public interface PaymentService {

    List<PaymentDto> getAll();

    PaymentDto getById(Long id);

    PaymentDto create(PaymentDto payment);

    PaymentDto update(PaymentDto payment);

    void delete(Long id);
}
