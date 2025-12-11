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
import com.minh.subscription.data.vo.CustomerVm;
import com.minh.subscription.data.vo.CustomerVo;
import com.minh.subscription.data.vo.SubscriptionVo;
import com.minh.subscription.feign.CustomerFeign;
import com.minh.subscription.feign.MediaFeign;
import com.minh.subscription.service.SubscriptionService;
import com.minh.utils.DateTimeUtils;
import com.minh.utils.SecurityUtil;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    @Value("${fe.end-point}")
    private String feEndPoint;

    @Override
    public List<SubscriptionVo> getAll() {

        List<SubscriptionDto> dtos = subscriptionMapper.toDto(subscriptionRepository.findAll());

        List<SubscriptionVo> vos = subscriptionMapper.toVo(dtos);

        vos.forEach(vo -> {
            CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(vo.getUserId()));
            if (customerVo != null) {
                vo.setCustomer(customerVo.getCustomer());
            }
        });

        return vos;
    }

    @Override
    public SubscriptionVo getById(Long id) {
        SubscriptionEntity entity = subscriptionRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND));

        SubscriptionDto dto = subscriptionMapper.toDto(entity);

        SubscriptionVo vo = subscriptionMapper.toVo(dto);

        CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(dto.getUserId()));
        if (customerVo != null) {
            vo.setCustomer(customerVo.getCustomer());
        }

        return vo;
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

    @Override
    public List<SubscriptionVo> getAllSubscriptionsByUserId(String userId) {
        List<SubscriptionEntity> list = subscriptionRepository.findAllByUserId(userId);

        if (list.isEmpty()) {
            throw new BusinessException(CoreMessageCode.SUBSCRIPTION_NOT_FOUND);
        }

        List<SubscriptionDto> dtos = subscriptionMapper.toDto(list);
        List<SubscriptionVo> vos = subscriptionMapper.toVo(dtos);

        return vos;
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
            String body = templateDto.getBody().replace("{{link}}", feEndPoint + "/applicant/subscription")
                    .replace("{{expireDate}}", DateTimeUtils.format(entity.getEndDate(), "dd/MM/yyyy"));
            mailDto.setBody(body);
            mailDto.setTo(customer.getCustomer().email());
            mediaFeign.sendMail(mailDto);
        });
        return true;
    }

    @Override
    public SubscriptionVo getCurrentSubscriptionByUser() {
        String userId = SecurityUtil.getCurrentUserId();
        if (ObjectUtils.isEmpty(userId)) {
            return null;
        }

        // Lấy tất cả subscription hiện tại
        List<SubscriptionEntity> entities = subscriptionRepository.findCurrentSubscription(userId);
        if (entities.isEmpty()) {
            return null;
        }

        // Lấy startDate nhỏ nhất và endDate lớn nhất
        LocalDateTime startDate = entities.stream()
                .map(SubscriptionEntity::getStartDate)
                .min(LocalDateTime::compareTo)
                .orElse(null);

        LocalDateTime endDate = entities.stream()
                .map(SubscriptionEntity::getEndDate)
                .max(LocalDateTime::compareTo)
                .orElse(null);

        // Map từ 1 entity bất kỳ (ví dụ entity đầu tiên)
        SubscriptionVo vo = subscriptionMapper.toVo(
                subscriptionMapper.toDto(entities.get(0))
        );

        // Gán lại startDate/endDate đã merge
        vo.setStartDate(startDate);
        vo.setEndDate(endDate);

        // Gọi customer service
        CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(userId));
        if (customerVo != null) {
            vo.setCustomer(customerVo.getCustomer());
        }

        return vo;
    }

}
