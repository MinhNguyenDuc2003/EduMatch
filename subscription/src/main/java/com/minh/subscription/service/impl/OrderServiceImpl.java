package com.minh.subscription.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.subscription.OrderDto;
import com.minh.service.base.BaseService;
import com.minh.subscription.data.entity.OrderEntity;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.subscription.data.mapper.OrderMapper;
import com.minh.subscription.data.repository.OrderRepository;
import com.minh.subscription.data.repository.SubscriptionRepository;
import com.minh.subscription.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl extends BaseService implements OrderService {

    private final OrderRepository orderRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final OrderMapper orderMapper;

    @Override
    public List<OrderDto> getAll() {
        return orderMapper.toDto(orderRepository.findAll());
    }

    @Override
    public OrderDto getById(Long id) {
        OrderEntity entity = orderRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.ORDER_NOT_FOUND));
        return orderMapper.toDto(entity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public OrderDto create(OrderDto payment) {
        OrderEntity entity = orderMapper.toEntity(payment);

        // Gắn SubscriptionEntity nếu có id
        if (payment.getSubscriptionId() != null) {
            SubscriptionEntity subscription = subscriptionRepository.findById(payment.getSubscriptionId())
                    .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));
            entity.setSubscription(subscription);
        }

        OrderEntity savedEntity = orderRepository.save(entity);
        return orderMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public OrderDto update(OrderDto payment) {
        OrderEntity existingEntity = orderRepository.findByIdAndActive(payment.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.ORDER_NOT_FOUND));

        orderMapper.updateEntityFromDto(payment, existingEntity);

        if (payment.getSubscriptionId() != null) {
            SubscriptionEntity subscription = subscriptionRepository.findById(payment.getSubscriptionId())
                    .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));
            existingEntity.setSubscription(subscription);
        }

        OrderEntity savedEntity = orderRepository.save(existingEntity);
        return orderMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.ORDER_NOT_FOUND);
        }
        orderRepository.updateActiveById(id);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public OrderDto markAsPaid(String transactionId) {
        OrderEntity entity = orderRepository.findByTransactionIdAndActive(transactionId, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.ORDER_NOT_FOUND));

        entity.setStatus("PAID");
        entity.setTransactionId(transactionId);

        OrderEntity savedEntity = orderRepository.save(entity);
        return orderMapper.toDto(savedEntity);
    }

}
