package com.minh.subscription.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.subscription.PaymentDto;
import com.minh.service.base.BaseService;
import com.minh.subscription.data.entity.PaymentEntity;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.subscription.data.mapper.PaymentMapper;
import com.minh.subscription.data.repository.PaymentRepository;
import com.minh.subscription.data.repository.SubscriptionRepository;
import com.minh.subscription.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl extends BaseService implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentMapper paymentMapper;

    @Override
    public List<PaymentDto> getAll() {
        return paymentMapper.toDto(paymentRepository.findAll());
    }

    @Override
    public PaymentDto getById(Long id) {
        PaymentEntity entity = paymentRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.ORDER_NOT_FOUND));
        return paymentMapper.toDto(entity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public PaymentDto create(PaymentDto payment) {
        PaymentEntity entity = paymentMapper.toEntity(payment);

        // Gắn SubscriptionEntity nếu có id
        if (payment.getSubscriptionId() != null) {
            SubscriptionEntity subscription = subscriptionRepository.findById(payment.getSubscriptionId())
                    .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));
            entity.setSubscription(subscription);
        }

        PaymentEntity savedEntity = paymentRepository.save(entity);
        return paymentMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public PaymentDto update(PaymentDto payment) {
        PaymentEntity existingEntity = paymentRepository.findByIdAndActive(payment.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.ORDER_NOT_FOUND));

        paymentMapper.updateEntityFromDto(payment, existingEntity);

        if (payment.getSubscriptionId() != null) {
            SubscriptionEntity subscription = subscriptionRepository.findById(payment.getSubscriptionId())
                    .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));
            existingEntity.setSubscription(subscription);
        }

        PaymentEntity savedEntity = paymentRepository.save(existingEntity);
        return paymentMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.ORDER_NOT_FOUND);
        }
        paymentRepository.updateActiveById(id);
    }
}
