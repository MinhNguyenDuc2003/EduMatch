package com.minh.subscription.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.mail.MailTypeEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import com.minh.model.dto.subscription.SubscriptionDto;
import com.minh.service.base.BaseService;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import com.minh.subscription.data.mapper.SubscriptionMapper;
import com.minh.subscription.data.repository.SubscriptionPlanRepository;
import com.minh.subscription.data.repository.SubscriptionRepository;
import com.minh.subscription.data.vo.CustomerVo;
import com.minh.subscription.feign.CustomerFeign;
import com.minh.subscription.feign.MediaFeign;
import com.minh.subscription.service.SubscriptionService;
import com.minh.utils.DateTimeUtils;
import com.minh.utils.SecurityUtil;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl extends BaseService implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionMapper subscriptionMapper;
    private final SubscriptionPlanRepository subscriptionPlanRepository;
    private final MediaFeign mediaFeign;
    private final CustomerFeign customerFeign;

    @Override
    public List<SubscriptionDto> getAll() {
        return subscriptionMapper.toDto(subscriptionRepository.findAll());
    }

    @Override
    public SubscriptionDto getById(Long id) {
        SubscriptionEntity entity = subscriptionRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));
        return subscriptionMapper.toDto(entity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public SubscriptionDto create(SubscriptionDto subscription) {
        String userId = UaaContextHolder.getUserId();
        subscription.setUserId(userId);

        SubscriptionPlanEntity plan = subscriptionPlanRepository.findById(subscription.getPlanId())
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));

        SubscriptionEntity entity = subscriptionMapper.toEntity(subscription);
        entity.setPlan(plan);

        SubscriptionEntity savedEntity = subscriptionRepository.save(entity);

        return subscriptionMapper.toDto(savedEntity);
    }


    @Override
    @Transactional(rollbackOn = Exception.class)
    public SubscriptionDto update(SubscriptionDto subscription) {
        SubscriptionEntity existingEntity = subscriptionRepository.findByIdAndActive(subscription.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));

        if (subscription.getPlanId() != null) {
            SubscriptionPlanEntity plan = subscriptionPlanRepository.findById(subscription.getPlanId())
                    .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_PLAN_NOT_FOUND));
            existingEntity.setPlan(plan);
        }

        subscriptionMapper.updateEntityFromDto(subscription, existingEntity);

        existingEntity.setActive(true);

        SubscriptionEntity savedEntity = subscriptionRepository.save(existingEntity);
        return subscriptionMapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!subscriptionRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND);
        }
        subscriptionRepository.updateActiveById(id, false);
    }

    public List<SubscriptionDto> getAllSubscriptionsByUserId(String userId) {
        List<SubscriptionEntity> list = subscriptionRepository.findAllByUserId(userId);
        if (list.isEmpty()) {
            throw new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND);
        }
        return list.stream()
                .map(subscriptionMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Boolean sendMailExpiredDate5DaysLeft() {
        List<SubscriptionEntity> entities = subscriptionRepository.getAllExpiredDate5DaysLeft();
        System.out.println("Size: "+ entities.size());
        MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.SUBSCRIPTION_EXPIRING.getCode()));
        MailDto mailDto = new MailDto();
        mailDto.setSubject(templateDto.getSubject());
        mailDto.setTemplateId(templateDto.getId());
        entities.forEach(entity -> {
            CustomerVo customer = this.parseResponse(customerFeign.getSimpleCustomerById(entity.getUserId()));
            String body = templateDto.getBody().replace("{{link}}", "http://159.89.200.244/edufront/home")
                    .replace("{{expireDate}}", DateTimeUtils.format(entity.getEndDate(), "dd/MM/yyyy"));
            mailDto.setBody(body);
//            mailDto.setTo(customer.getCustomer().email());
            mailDto.setTo("ducm40877@gmail.com");
            mediaFeign.sendMail(mailDto);
        });
        return true;
    }

    @Override
    public List<SubscriptionDto> getCurrentSubscriptionByUser() {
        String userId = SecurityUtil.getCurrentUserId();
        if (ObjectUtils.isEmpty(userId)) {
            return null;
        }

        List<SubscriptionEntity> entity = subscriptionRepository.findCurrentSubscription(userId);
        return subscriptionMapper.toDto(entity);
    }
}
