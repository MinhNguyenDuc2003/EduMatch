package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.mail.MailTypeEnum;
import com.minh.enumeration.notification.NotificationReferenceEnum;
import com.minh.enumeration.notification.NotificationTemplateEnum;
import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.model.dto.scholarship.ApplicationScholarshipDto;
import com.minh.scholarship.data.entity.ApplicationScholarshipEntity;
import com.minh.scholarship.data.mapper.ApplicationScholarshipMapper;
import com.minh.scholarship.data.repository.ApplicationScholarshipRepository;
import com.minh.scholarship.data.vo.*;
import com.minh.scholarship.feign.MediaFeign;
import com.minh.scholarship.feign.NotificationTemplateFeign;
import com.minh.scholarship.feign.ProviderProfileFeign;
import com.minh.scholarship.message.KafkaProducer;
import com.minh.scholarship.service.ApplicationScholarshipService;
import com.minh.scholarship.service.ApplicationService;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.base.BaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationScholarshipServiceImpl extends BaseService implements ApplicationScholarshipService {

    private final ApplicationScholarshipRepository repository;
    private final ApplicationScholarshipMapper mapper;
    private final ApplicationScholarshipMapper applicationScholarshipMapper;
    private final ApplicationService applicationService;
    private final ScholarshipService scholarshipService;
    private final MediaFeign mediaFeign;

    @Autowired
    private KafkaProducer kafkaProducer;
    @Autowired
    private NotificationTemplateFeign notificationTemplateFeign;

    @Value("${kafka.mail.send-mail.topic}")
    private String mailTopic;

    @Value("${kafka.application.update-status.topic}")
    private String newEventApplicationTopic;
    @Value("${kafka.provider.application.topic}")
    private String newEventProviderTopic;
    @Autowired
    private ProviderProfileFeign providerProfileFeign;

    @Override
    public List<ApplicationScholarshipVo> getAll() {
        List<ApplicationScholarshipEntity> entities = repository.findByActive(true);
        List<ApplicationScholarshipVo> vos = mapper.entitiesToVos(entities);
        vos.forEach(vo -> {
            vo.setApplicationVo(applicationService.getById(vo.getApplicationId()));
            vo.setScholarshipVo(scholarshipService.getById(vo.getScholarshipId()));
        });
        return vos;
    }

    @Override
    public ApplicationScholarshipVo getById(Long id) {
        ApplicationScholarshipEntity entity = repository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_SCHOLARSHIP_NOT_FOUND));
        ApplicationScholarshipVo vo = mapper.entityToVo(entity);
        vo.setApplicationVo(applicationService.getById(vo.getApplicationId()));
        vo.setScholarshipVo(scholarshipService.getById(vo.getScholarshipId()));
        return vo;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationScholarshipDto create(ApplicationScholarshipDto dto) {
        ApplicationVo application = applicationService.getById(dto.getApplicationId());
        if (dto.getApplicationId() == null || application == null) {
            throw new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST);
        }

        ScholarshipVo scholarshipVo = scholarshipService.getById(dto.getScholarshipId());
        if (dto.getScholarshipId() == null || scholarshipVo == null) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
        }

        if (repository.existsByApplicationIdAndScholarshipId(dto.getApplicationId(), dto.getScholarshipId())) {
            throw new BusinessException(CoreMessageCode.APPLICATION_ALREADY_SUBMITTED);
        }
        ApplicationScholarshipEntity saved = repository.save(mapper.toEntity(dto));
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getOne(scholarshipVo.getProviderId()));

        NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.SCHOLARSHIP_APPLICATION.getCode()));
        NotificationVo notificationVo = NotificationVo.builder()
                .topic(NotificationTopicEnum.SCHOLARSHIP_APPLICATION)
                .title(notificationTemplateDto.getTitle().replace("{scholarshipName}", scholarshipVo.getTitle()))
                .content(notificationTemplateDto.getContent().replace("{scholarshipName}", scholarshipVo.getTitle())
                        .replace("{applicantName}", application.getFullName()))
                .isRead(false)
                .referenceId(saved.getId())
                .referenceType(NotificationReferenceEnum.SCHOLARSHIP_APPLICATION.getCode())
                .userId(providerProfileVo.getUserId())
                .userNotificationId(notificationTemplateDto.getId())
                .build();
        kafkaProducer.convertToByteAndSend(newEventProviderTopic, notificationVo);
        return mapper.toDto(saved);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationScholarshipDto update(ApplicationScholarshipDto dto) {
        ApplicationScholarshipEntity exist = repository.findByIdAndActive(dto.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_SCHOLARSHIP_NOT_FOUND));

        ApplicationVo application = applicationService.getById(dto.getApplicationId());
        if (dto.getApplicationId() == null || application == null) {
            throw new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST);
        }

        ScholarshipVo scholarshipVo = scholarshipService.getById(dto.getScholarshipId());
        if (dto.getScholarshipId() == null || scholarshipVo == null) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
        }

        if (!exist.getStatus().equalsIgnoreCase(dto.getStatus())) {
            NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.APPLICATION_STATUS_UPDATED.getCode()));
            NotificationVo notificationVo = NotificationVo.builder()
                    .topic(NotificationTopicEnum.APPLICATION_SUBMITTED)
                    .title(notificationTemplateDto.getTitle().replace("{scholarshipName}", scholarshipVo.getTitle()))
                    .content(notificationTemplateDto.getContent().replace("{scholarshipName}", scholarshipVo.getTitle()))
                    .isRead(false)
                    .referenceId(exist.getId())
                    .referenceType(NotificationReferenceEnum.APPLICATION.getCode())
                    .userId(application.getUserId())
                    .userNotificationId(notificationTemplateDto.getId())
                    .build();
            kafkaProducer.convertToByteAndSend(newEventApplicationTopic, notificationVo);

            MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.APPLICATION_UPDATED.getCode()));
            String body = templateDto.getBody().replace("{{scholarshipName}}", scholarshipVo.getTitle())
                    .replace("{{UniversityName}}", scholarshipVo.getUniversity())
                    .replace("{{status}}", dto.getStatus())
                    .replace("{{link}}", "");
            MailDto mailDto = new MailDto();
            mailDto.setBody(body);
            mailDto.setTo(application.getEmail());
            mailDto.setSubject(templateDto.getSubject());
            mailDto.setTemplateId(templateDto.getId());
        }
        mapper.updateEntityFromDto(dto, exist);
        ApplicationScholarshipEntity saved = repository.save(exist);
        return mapper.toDto(saved);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.APPLICATION_SCHOLARSHIP_NOT_FOUND);
        }
        repository.updateActiveById(id);
    }

    @Override
    public List<ApplicationScholarshipVo> getAllByApplicationId(Long applicationId) {
        boolean exists = repository.existsByApplicationIdAndActive(applicationId, true);
        if (applicationId == null || !exists) {
            return null;
        }
        List<ApplicationScholarshipEntity> entities =
                repository.findByApplicationIdAndActive(applicationId, true);
        List<ApplicationScholarshipVo> vos = mapper.entitiesToVos(entities);
        vos.forEach(vo -> {
            vo.setApplicationVo(applicationService.getById(vo.getApplicationId()));
            vo.setScholarshipVo(scholarshipService.getById(vo.getScholarshipId()));
        });
        return vos;
    }

    @Override
    public List<ApplicationScholarshipVo> getAllByScholarshipId(Long scholarshipId) {
        boolean exists = repository.existsByScholarshipIdAndActive(scholarshipId, true);
        if (scholarshipId == null || !exists) {
            return null;
        }

        List<ApplicationScholarshipDto> dto = mapper.toDto(repository.findByScholarshipIdAndActive(scholarshipId, true));
        List<ApplicationScholarshipVo> vos = applicationScholarshipMapper.dtoToVos(dto);
        vos.forEach(o -> {
            o.setApplicationVo(applicationService.getById(o.getApplicationId()));
            o.setScholarshipVo(scholarshipService.getById(o.getScholarshipId()));
        });
        return vos;
    }

    @Override
    public List<ApplicationScholarshipDto> getAllByStatus(String status) {
        return mapper.toDto(repository.findByStatusAndActive(status, true));
    }

    @Override
    public List<ApplicationScholarshipVo> getByMyScholarship() {
        List<ApplicationScholarshipVo> vos = new ArrayList<>();
        List<ApplicationVo> allMyApplication = applicationService.getAllMyApplication();
        if (ObjectUtils.isEmpty(allMyApplication)) {
            return null;
        }
        for (ApplicationVo applicationVo : allMyApplication) {
            List<ApplicationScholarshipVo> allByApplicationId = this.getAllByApplicationId(applicationVo.getId());
            if (ObjectUtils.isNotEmpty(allByApplicationId)) {
                vos.addAll(allByApplicationId);
            }
        }
        return vos;
    }

}