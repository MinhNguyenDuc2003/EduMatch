package com.minh.subscription.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.subscription.MonthlyRevenueDto;
import com.minh.model.dto.subscription.OrderDto;
import com.minh.model.dto.subscription.RevenueByUserTypeDto;
import com.minh.service.base.BaseService;
import com.minh.subscription.data.entity.OrderEntity;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import com.minh.subscription.data.mapper.OrderMapper;
import com.minh.subscription.data.repository.OrderRepository;
import com.minh.subscription.data.repository.SubscriptionPlanRepository;
import com.minh.subscription.data.repository.SubscriptionRepository;
import com.minh.subscription.service.OrderService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl extends BaseService implements OrderService {

    private final OrderRepository orderRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionPlanRepository subscriptionplanRepository;
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

        String userId = UaaContextHolder.getUserId();
        entity.setUserId(userId);

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

        String userId = UaaContextHolder.getUserId();
        existingEntity.setUserId(userId);

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
    public OrderDto markAsPaid(String transactionId, Long subscriptionPlanId) {

        String userId = UaaContextHolder.getUserId();

        // Lấy Subscription Plan mà user đã mua
        SubscriptionPlanEntity plan = subscriptionplanRepository.findById(subscriptionPlanId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));

        Optional<SubscriptionEntity> existingActiveSub =
                subscriptionRepository.findByUserIdAndActiveTrue(userId);

        if (existingActiveSub.isPresent()) {
            throw new BusinessException(CoreMessageCode.SUBSCRIPTION_ALREADY_ACTIVE);
        }

        // Tạo Subscription mới (ACTIVE)
        SubscriptionEntity subscription = new SubscriptionEntity();
        subscription.setUserId(userId);
        subscription.setPlan(plan);
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusDays(plan.getDurationDays()));
        subscription.setStatus("true");
        subscription.setUserType(plan.getTargetType());
        subscription.setActive(true);

        subscriptionRepository.save(subscription);
        // Tạo Order và gán subscription mới vừa tạo
        OrderEntity order = new OrderEntity();
        order.setUserId(userId);
        order.setTransactionId(transactionId);
        order.setStatus("PAID");
        order.setPaidAt(LocalDateTime.now());
        order.setActive(true);
        order.setSubscription(subscription);
        order.setAmount(subscription.getPlan().getPrice());
        order.setCurrency("USD");
        order.setPaymentMethod("CARD");

        order = orderRepository.save(order);

        // Trả về OrderDto
        return orderMapper.toDto(order);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public OrderDto extendSubscription(Long subscriptionId, Long subscriptionPlanId, String transactionId) {

        String userId = UaaContextHolder.getUserId();
        LocalDateTime now = LocalDateTime.now();

        // Lấy Subscription Plan mới
        SubscriptionPlanEntity plan = subscriptionplanRepository.findById(subscriptionPlanId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));

        // Lấy Subscription hiện tại của user
        SubscriptionEntity subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));

        if (!subscription.getUserId().equals(userId)) {
            throw new BusinessException(CoreMessageCode.ACCESS_DENIED);
        }

        // Tính ngày mới
        LocalDateTime baseDate = subscription.getEndDate().isBefore(now) ? now : subscription.getEndDate();
        subscription.setEndDate(baseDate.plusDays(plan.getDurationDays()));

        // Cập nhật plan nếu cần
        subscription.setPlan(plan);

        subscriptionRepository.save(subscription);

        // Tạo order mới cho giao dịch gia hạn
        OrderEntity order = new OrderEntity();
        order.setUserId(userId);
        order.setTransactionId(transactionId);
        order.setStatus("PAID");
        order.setPaidAt(now);
        order.setActive(true);
        order.setSubscription(subscription);
        order.setAmount(plan.getPrice());
        order.setCurrency("USD");
        order.setPaymentMethod("CARD");

        order = orderRepository.save(order);

        return orderMapper.toDto(order);
    }

    @Override
    public List<MonthlyRevenueDto> getMonthlyRevenue() {
        return orderRepository.getMonthlyRevenue();
    }

    @Override
    public List<RevenueByUserTypeDto> getRevenueByUserType() {
        return orderRepository.getRevenueByUserType();
    }

    @Override
    public List<MonthlyRevenueDto> getRevenueByMonth() {
        return orderRepository.getRevenueByMonth();
    }
}
