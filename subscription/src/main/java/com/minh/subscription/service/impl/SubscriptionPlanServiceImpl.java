package com.minh.subscription.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.exception.BusinessException;
import com.minh.model.dto.subscription.SubscriptionPlanDto;
import com.minh.service.base.BaseService;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import com.minh.subscription.data.mapper.SubscriptionPlanMapper;
import com.minh.subscription.data.repository.SubscriptionPlanRepository;
import com.minh.subscription.service.SubscriptionPlanService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionPlanServiceImpl extends BaseService implements SubscriptionPlanService {

    private final SubscriptionPlanRepository subscriptionPlanRepository;
    private final SubscriptionPlanMapper subscriptionPlanMapper;

    @Override
    public List<SubscriptionPlanDto> getAll() {
        return subscriptionPlanMapper.toDto(subscriptionPlanRepository.findByActiveTrue());
    }

    @Override
    public SubscriptionPlanDto getById(Long id) {
        SubscriptionPlanEntity entity = subscriptionPlanRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));
        return subscriptionPlanMapper.toDto(entity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public SubscriptionPlanDto create(SubscriptionPlanDto subscriptionPlan) {
        SubscriptionPlanEntity savedEntity =
                subscriptionPlanRepository.save(subscriptionPlanMapper.toEntity(subscriptionPlan));
        return subscriptionPlanMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public SubscriptionPlanDto update(SubscriptionPlanDto subscriptionPlan) {
        SubscriptionPlanEntity existingEntity = subscriptionPlanRepository.findByIdAndActive(subscriptionPlan.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));

        subscriptionPlanMapper.updateEntityFromDto(subscriptionPlan, existingEntity);

        SubscriptionPlanEntity savedEntity = subscriptionPlanRepository.save(existingEntity);
        return subscriptionPlanMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!subscriptionPlanRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND);
        }
        subscriptionPlanRepository.updateActiveById(id, false);
    }

    @Override
    public List<SubscriptionPlanDto> getByTargetType(SubscriptionTargetType targetType) {
        if (targetType == null) {
            throw new BusinessException(CoreMessageCode.INVALID_TARGET_TYPE);
        }

        List<SubscriptionPlanEntity> entities = subscriptionPlanRepository.findByTargetTypeAndActiveTrue(targetType);

        if (entities.isEmpty()) {
            throw new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND);
        }

        return subscriptionPlanMapper.toDto(entities);
    }
}
