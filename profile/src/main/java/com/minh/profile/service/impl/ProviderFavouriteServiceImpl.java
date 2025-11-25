package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.mail.MailTypeEnum;
import com.minh.enumeration.notification.NotificationReferenceEnum;
import com.minh.enumeration.notification.NotificationTemplateEnum;
import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.model.dto.profile.ProviderFavouriteDto;
import com.minh.profile.data.entity.ProviderFavouriteEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.mapper.ProviderFavouriteMapper;
import com.minh.profile.data.repository.ProviderFavouriteRepository;
import com.minh.profile.data.repository.ProviderProfileRepository;
import com.minh.profile.data.vo.*;
import com.minh.profile.feign.CustomerFeign;
import com.minh.profile.feign.MediaFeign;
import com.minh.profile.feign.NotificationTemplateFeign;
import com.minh.profile.feign.ScholarshipFeign;
import com.minh.profile.message.KafkaProducer;
import com.minh.profile.service.ApplicantProfileService;
import com.minh.profile.service.ProviderFavouriteService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProviderFavouriteServiceImpl extends BaseService implements ProviderFavouriteService {

    private final ProviderFavouriteRepository providerFavouriteRepository;
    private final ApplicantProfileService applicantProfileService;
    private final ProviderFavouriteMapper providerFavouriteMapper;
    private final ProviderProfileRepository providerProfileRepository;
    private final KafkaProducer kafkaProducer;
    private final NotificationTemplateFeign notificationTemplateFeign;
    private final ScholarshipFeign scholarshipFeign;

    private final MediaFeign mediaFeign;
    private final CustomerFeign customerFeign;

    @Value("${kafka.scholarship.referral-event.topic}")
    private String referralEventTopic;
    @Value("${kafka.mail.send-mail.topic}")
    private String mailTopic;
    @Value("${fe.end-point}")
    private String feEndPoint;

    @Override
    public List<ProviderFavouriteVo> getMyFavourite() {
        String userId = UaaContextHolder.getUserId();
        Optional<ProviderProfileEntity> provider = providerProfileRepository.findByUserId(userId);
        if (provider.isEmpty()) {
            return null;
        }
        List<ProviderFavouriteVo> allByProviderIdAndActive = providerFavouriteMapper.entitiesToVos(providerFavouriteRepository.findAllByProviderIdAndActive(provider.get().getId(), true));
        allByProviderIdAndActive.forEach(entity -> {
            ApplicantProfileVo applicant =
                    applicantProfileService.getOneByUserId(entity.getUserId());
            if (applicant != null) {
                entity.setApplicantProfileVo(applicant);
            }
        });
        return allByProviderIdAndActive;
    }

    @Override
    public ProviderFavouriteVo getById(Long id) {
        return providerFavouriteMapper.entityToVo(providerFavouriteRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND)));
    }

    @Override
    @Transactional
    public ProviderFavouriteDto create(ProviderFavouriteDto dto) {
        if (providerFavouriteRepository.existsByProviderIdAndUserIdAndActive(dto.getProviderId(), dto.getUserId(), true)) {
            throw new BusinessException(CoreMessageCode.APPLICANT_ALREADY_ADDED_TO_FAVOURITE);
        }

        ProviderFavouriteEntity entity = providerFavouriteMapper.toEntity(dto);
        providerFavouriteRepository.save(entity);

        return providerFavouriteMapper.entityToVo(entity);
    }

    @Override
    @Transactional
    public ProviderFavouriteDto update(ProviderFavouriteDto dto) {

        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(dto.getId())
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND));

        providerFavouriteMapper.updateEntityFromDto(dto, entity);
        providerFavouriteRepository.save(entity);

        return providerFavouriteMapper.entityToVo(entity);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND));

        entity.setActive(false);
        providerFavouriteRepository.save(entity);
    }

    @Override
    public Boolean sendOneRefer(String userId, Long scholarshipId) {
        ScholarshipVo scholarshipVo = this.parseResponse(scholarshipFeign.getById(scholarshipId));
        CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(userId));
        //send notification
        NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.APPLICATION_REFERRAL.getCode()));
        NotificationVo notificationVo = NotificationVo.builder()
                .topic(NotificationTopicEnum.APPLICATION_REFERRAL)
                .title(notificationTemplateDto.getTitle().replace("{{providerName}}", scholarshipVo.getProviderProfileVo().getOrganizationName()))
                .content(notificationTemplateDto.getContent().replace("{{providerName}}", scholarshipVo.getProviderProfileVo().getOrganizationName()
                        .replace("{{scholarshipName}}", scholarshipVo.getTitle())))
                .isRead(false)
                .referenceId(scholarshipId)
                .referenceType(NotificationReferenceEnum.APPLICATION_REFERRAL.getCode())
                .userId(userId)
                .userNotificationId(notificationTemplateDto.getId())
                .build();
        kafkaProducer.convertToByteAndSend(referralEventTopic, notificationVo);

        //send gmail
        MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.REFERRAL_APPLICATION.getCode()));
        String body = templateDto.getBody().replace("{{scholarshipName}}", scholarshipVo.getTitle())
                .replace("{{universityName}}", scholarshipVo.getUniversity())
                .replace("{{description}}", scholarshipVo.getDescription())
                .replace("{{amount}}", scholarshipVo.getFundingAmount())
                .replace("{{link}}", "http://159.89.200.244/edufront/home");
        MailDto mailDto = new MailDto();
        mailDto.setBody(body);
        mailDto.setTo(customerVo.getCustomer().email());
        mailDto.setSubject(templateDto.getSubject());
        mailDto.setTemplateId(templateDto.getId());
        kafkaProducer.convertToByteAndSend(mailTopic, mailDto);

        return true;
    }

    @Override
    public Boolean sendAllRefer(ReferralRequestVo referralRequestVo) {
        List<String> userIds = referralRequestVo.getUserIds();
        Long scholarshipId = referralRequestVo.getScholarshipId();
        ScholarshipVo scholarshipVo = this.parseResponse(scholarshipFeign.getById(scholarshipId));
        userIds.forEach(userId -> {
            CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(userId));
            //send notification
            NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.APPLICATION_REFERRAL.getCode()));
            NotificationVo notificationVo = NotificationVo.builder()
                    .topic(NotificationTopicEnum.APPLICATION_REFERRAL)
                    .title(notificationTemplateDto.getTitle().replace("{{providerName}}", scholarshipVo.getProviderProfileVo().getOrganizationName()))
                    .content(notificationTemplateDto.getContent().replace("{{providerName}}", scholarshipVo.getProviderProfileVo().getOrganizationName())
                            .replace("{{scholarshipName}}", scholarshipVo.getTitle()))
                    .isRead(false)
                    .referenceId(scholarshipId)
                    .referenceType(NotificationReferenceEnum.APPLICATION_REFERRAL.getCode())
                    .userId(userId)
                    .userNotificationId(notificationTemplateDto.getId())
                    .build();
            kafkaProducer.convertToByteAndSend(referralEventTopic, notificationVo);

            //send gmail
            MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.REFERRAL_APPLICATION.getCode()));
            String body = templateDto.getBody().replace("{{scholarshipName}}", scholarshipVo.getTitle())
                    .replace("{{universityName}}", scholarshipVo.getUniversity())
                    .replace("{{description}}", scholarshipVo.getDescription())
                    .replace("{{amount}}", scholarshipVo.getFundingAmount())
                    .replace("{{link}}", "http://159.89.200.244/edufront/home");
            MailDto mailDto = new MailDto();
            mailDto.setBody(body);
            mailDto.setTo(customerVo.getCustomer().email());
            mailDto.setSubject(templateDto.getSubject());
            mailDto.setTemplateId(templateDto.getId());
            kafkaProducer.convertToByteAndSend(mailTopic, mailDto);
        });

        return true;
    }

}
