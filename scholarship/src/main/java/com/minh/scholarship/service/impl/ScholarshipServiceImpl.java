package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.notification.NotificationReferenceEnum;
import com.minh.enumeration.notification.NotificationTemplateEnum;
import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.entity.junction.ScholarshipMediaEntity;
import com.minh.scholarship.data.mapper.ScholarshipMapper;
import com.minh.scholarship.data.repository.ScholarshipMediaRepository;
import com.minh.scholarship.data.repository.ScholarshipRepository;
import com.minh.scholarship.data.vo.NotificationVo;
import com.minh.scholarship.data.vo.ProviderProfileVo;
import com.minh.scholarship.feign.MediaFeign;
import com.minh.scholarship.feign.NotificationTemplateFeign;
import com.minh.scholarship.feign.ProviderProfileFeign;
import com.minh.scholarship.message.KafkaProducer;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl extends BaseService implements ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipMapper scholarshipMapper;
    private final ScholarshipMediaRepository scholarshipMediaRepository;
    private final MediaFeign mediaFeign;
    private final NotificationTemplateFeign notificationTemplateFeign;
    private final KafkaProducer kafkaProducer;
    private final ProviderProfileFeign providerProfileFeign;

    @Value("${kafka.scholarship.new-event.topic}")
    private String newEventScholarshipTopic;


    @Override
    public List<ScholarshipDto> getAll() {
        return scholarshipMapper.toDto(scholarshipRepository.findAll());
    }

    @Override
    public ScholarshipDto getById(Long id) {
        ScholarshipEntity entity = scholarshipRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        return scholarshipMapper.toDto(entity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipDto create(ScholarshipDto scholarship, List<MultipartFile> images) {
        ScholarshipEntity savedScholarship = scholarshipRepository.save(scholarshipMapper.toEntity(scholarship));
        if (ObjectUtils.isNotEmpty(images)) {
            uploadImages(scholarship, images, savedScholarship.getId());
        }
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getOne(savedScholarship.getProviderId()));
        NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.SCHOLARSHIP_NEW.getCode()));
        NotificationVo notificationVo = NotificationVo.builder()
                .topic(NotificationTopicEnum.SCHOLARSHIP_FOLLOWER)
                .title(notificationTemplateDto.getTitle())
                .content(notificationTemplateDto.getContent()
                        .replace("{{providerName}}", providerProfileVo.getOrganizationName())
                        .replace("{{scholarshipName}}", savedScholarship.getTitle()))
                .isRead(false)
                .referenceId(savedScholarship.getId())
                .referenceType(NotificationReferenceEnum.SCHOLARSHIP.getCode())
                .userId(UaaContextHolder.getUserId())
                .build();
        System.out.println("UserId = " + UaaContextHolder.getUserId());
        kafkaProducer.convertToByteAndSend(newEventScholarshipTopic, notificationVo);
        return scholarshipMapper.toDto(savedScholarship);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipDto update(ScholarshipDto scholarship, List<MultipartFile> images) {
        ScholarshipEntity entity = scholarshipRepository.findByIdAndActive(scholarship.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));

        scholarshipMapper.updateEntityFromDto(scholarship, entity);

        if (ObjectUtils.isNotEmpty(images)) {
            scholarshipMediaRepository.deleteAllByScholarshipId(entity.getId());
            uploadImages(scholarship, images, entity.getId());
        }

        ScholarshipEntity saved = scholarshipRepository.save(entity);
        return scholarshipMapper.toDto(saved);
    }


    private void uploadImages(ScholarshipDto scholarship, List<MultipartFile> images, Long id) {
        images.forEach(image -> {
            MediaDto request = new MediaDto();
            request.setFileName(image.getOriginalFilename());
            request.setSize(image.getSize());
            request.setContentType(image.getContentType());
            try {
                request.setThumbnail(image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            request.setIsPublic(true);
            request.setFolderName("scholarship/" + id);
            MediaDto mediaDto = this.parseResponse(mediaFeign.create(request));

            ScholarshipMediaEntity entity = new ScholarshipMediaEntity();
            entity.setScholarshipId(id);
            entity.setMediaId(mediaDto.getId());
            scholarshipMediaRepository.save(entity);
        });
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!scholarshipRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
        }
        scholarshipRepository.updateActiveById(id, false);
    }
}
