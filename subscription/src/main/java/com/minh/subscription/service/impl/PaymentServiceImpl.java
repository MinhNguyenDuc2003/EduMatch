package com.minh.subscription.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.subscription.MonthlyRevenueDto;
import com.minh.model.dto.subscription.PaymentDto;
import com.minh.model.dto.subscription.RevenueByUserTypeDto;
import com.minh.service.base.BaseService;
import com.minh.subscription.data.entity.PaymentEntity;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import com.minh.subscription.data.mapper.PaymentMapper;
import com.minh.subscription.data.repository.PaymentRepository;
import com.minh.subscription.data.repository.SubscriptionPlanRepository;
import com.minh.subscription.data.repository.SubscriptionRepository;
import com.minh.subscription.data.vo.CustomerVo;
import com.minh.subscription.data.vo.PaymentVo;
import com.minh.subscription.feign.CustomerFeign;
import com.minh.subscription.service.PaymentService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl extends BaseService implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionPlanRepository subscriptionplanRepository;
    private final PaymentMapper paymentMapper;
    private final CustomerFeign customerFeign;

    @Override
    public List<PaymentVo> getAll() {

        List<PaymentEntity> entities = paymentRepository.findAllByOrderByCreatedDateDesc();

        List<PaymentVo> vos = paymentMapper.toVo(entities);

        vos.forEach(vo -> {
            CustomerVo customerVo = this.parseResponse(
                    customerFeign.getSimpleCustomerById(vo.getUserId())
            );
            if (customerVo != null && customerVo.getCustomer() != null) {
                vo.setCustomer(customerVo.getCustomer());
            }
        });

        return vos;
    }

    @Override
    public PaymentVo getById(Long id) {
        PaymentEntity entity = paymentRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.ORDER_NOT_FOUND));

        PaymentVo vo = paymentMapper.toVo(entity);

        CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(vo.getUserId()));
        if (customerVo != null && customerVo.getCustomer() != null) {
            vo.setCustomer(customerVo.getCustomer());
        }

        return vo;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public PaymentDto create(PaymentDto payment) {
        PaymentEntity entity = paymentMapper.toEntity(payment);

        String userId = UaaContextHolder.getUserId();
        entity.setUserId(userId);

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

        String userId = UaaContextHolder.getUserId();
        existingEntity.setUserId(userId);

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

    @Override
    @Transactional(rollbackOn = Exception.class)
    public PaymentDto markAsPaid(String transactionId, Long subscriptionPlanId) {

        String userId = UaaContextHolder.getUserId();

        // Lấy Subscription Plan người dùng mua
        SubscriptionPlanEntity plan = subscriptionplanRepository.findById(subscriptionPlanId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));

        // TẠO SUBSCRIPTION MỚI — KHÔNG CHECK SUBSCRIPTION CŨ
        SubscriptionEntity subscription = new SubscriptionEntity();
        subscription.setUserId(userId);
        subscription.setPlan(plan);
        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusDays(plan.getDurationDays()));
        subscription.setStatus("true");
        subscription.setUserType(plan.getTargetType());
        subscription.setActive(true);

        subscriptionRepository.save(subscription);

        // Tạo order và gán subscription mới
        PaymentEntity order = new PaymentEntity();
        order.setUserId(userId);
        order.setTransactionId(transactionId);
        order.setStatus("PAID");
        order.setPaidAt(LocalDateTime.now());
        order.setActive(true);
        order.setSubscription(subscription);
        order.setAmount(subscription.getPlan().getPrice());
        order.setCurrency("USD");
        order.setPaymentMethod("CARD");

        order = paymentRepository.save(order);

        return paymentMapper.toDto(order);
    }

    public PaymentDto extendSubscription(Long subscriptionPlanId, String transactionId) {

        String userId = UaaContextHolder.getUserId();
        LocalDateTime now = LocalDateTime.now();

        // Lấy plan
        SubscriptionPlanEntity plan = subscriptionplanRepository.findById(subscriptionPlanId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));

        // Lấy subscription hiện tại của user
        SubscriptionEntity current = subscriptionRepository.findFirstByUserIdAndActiveTrueOrderByEndDateDesc(userId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));

        // Tính ngày bắt đầu subscription mới
        LocalDateTime baseDate = current.getEndDate().isBefore(now) ? now : current.getEndDate();

        subscriptionRepository.save(current);

        // Tạo mới subscription
        SubscriptionEntity newSubscription = new SubscriptionEntity();
        newSubscription.setUserId(userId);
        newSubscription.setPlan(plan);
        newSubscription.setStartDate(baseDate);
        newSubscription.setEndDate(baseDate.plusDays(plan.getDurationDays()));
        newSubscription.setStatus("true");
        newSubscription.setUserType(plan.getTargetType());
        newSubscription.setActive(true);

        subscriptionRepository.save(newSubscription);

        // Tạo order mới
        PaymentEntity order = new PaymentEntity();
        order.setUserId(userId);
        order.setTransactionId(transactionId);
        order.setStatus("PAID");
        order.setPaidAt(now);
        order.setActive(true);
        order.setSubscription(newSubscription);
        order.setAmount(plan.getPrice());
        order.setCurrency("USD");
        order.setPaymentMethod("CARD");

        order = paymentRepository.save(order);

        return paymentMapper.toDto(order);
    }

    @Override
    public List<MonthlyRevenueDto> getMonthlyRevenue() {
        return paymentRepository.getMonthlyRevenue();
    }

    @Override
    public List<RevenueByUserTypeDto> getRevenueByUserType() {

        List<RevenueByUserTypeDto> list =
                paymentRepository.getRevenueByUserType();

        double totalRevenue = list.stream()
                .mapToDouble(RevenueByUserTypeDto::getTotal)
                .sum();

        if (totalRevenue == 0) {
            return list;
        }

        list.forEach(dto -> {
            double percent = (dto.getTotal() / totalRevenue) * 100;
            dto.setPercent(Math.round(percent * 100.0) / 100.0);
        });

        return list;
    }


    @Override
    public List<MonthlyRevenueDto> getRevenueByMonth() {
        return paymentRepository.getRevenueByMonth();
    }

    @Override
    public List<PaymentVo> getOrderHistoryForUser() {
        String userId = UaaContextHolder.getUserId();

        List<PaymentEntity> entities =
                paymentRepository.findAllByUserIdOrderByPaidAtDesc(userId);

        List<PaymentVo> vos = paymentMapper.toVo(entities);

        vos.forEach(vo -> {
            CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(vo.getUserId()));
            if (customerVo != null && customerVo.getCustomer() != null) {
                vo.setCustomer(customerVo.getCustomer());
            }
        });

        return vos;
    }
}
