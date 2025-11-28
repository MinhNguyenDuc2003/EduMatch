package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.mail.MailTypeEnum;
import com.minh.enumeration.notification.NotificationReferenceEnum;
import com.minh.enumeration.notification.NotificationTemplateEnum;
import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.exception.BusinessException;
import com.minh.model.dto.ai.AiRequestDto;
import com.minh.model.dto.ai.ScholarshipRecommendationResponseDto;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.model.dto.scholarship.*;
import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.entity.ScholarshipViewEntity;
import com.minh.scholarship.data.entity.junction.ScholarshipFollowerEntity;
import com.minh.scholarship.data.entity.junction.ScholarshipMediaEntity;
import com.minh.scholarship.data.mapper.ScholarshipFollowerMapper;
import com.minh.scholarship.data.mapper.ScholarshipMapper;
import com.minh.scholarship.data.mapper.ScholarshipPreferenceMapper;
import com.minh.scholarship.data.mapper.ScholarshipViewMapper;
import com.minh.scholarship.data.repository.*;
import com.minh.scholarship.data.vo.*;
import com.minh.scholarship.data.vo.projection.ScholarshipProjection;
import com.minh.scholarship.data.vo.projection.ScholarshipViewProjection;
import com.minh.scholarship.feign.*;
import com.minh.scholarship.message.KafkaProducer;
import com.minh.scholarship.model.filter.ScholarshipFilter;
import com.minh.scholarship.service.ApplicationService;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.base.BaseService;
import com.minh.utils.DateTimeUtils;
import com.minh.utils.SecurityUtil;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl extends BaseService implements ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipMapper scholarshipMapper;
    private final ScholarshipMediaRepository scholarshipMediaRepository;
    private final ApplicationScholarshipRepository applicationScholarshipRepository;
    private final MediaFeign mediaFeign;
    private final NotificationTemplateFeign notificationTemplateFeign;
    private final KafkaProducer kafkaProducer;
    private final ProviderProfileFeign providerProfileFeign;
    private final ScholarshipPreferenceRepository scholarshipPreferenceRepository;
    private final ScholarshipPreferenceMapper scholarshipPreferenceMapper;
    private final ScholarshipFollowerRepository scholarshipFollowerRepository;
    private final ScholarshipFollowerMapper scholarshipFollowerMapper;
    private final ScholarshipViewRepository scholarshipViewRepository;
    private final ScholarshipViewMapper scholarshipViewMapper;
    private final ApplicationService applicationService;
    private final AiMatchFeign aiMatchFeign;
    private final ApplicantProfileFeign applicantProfileFeign;
    private final CustomerFeign customerFeign;

    @Value("${fe.end-point}")
    private String feEndPoint;
    @Value("${kafka.scholarship.new-event.topic}")
    private String newEventScholarshipTopic;
    @Value("${kafka.mail.send-mail.topic}")
    private String mailTopic;

    @Override
    public List<ScholarshipDto> getAll() {
        return scholarshipMapper.toDto(scholarshipRepository.findAll());
    }

    @Override
    public ScholarshipVo getById(Long id) {
        ScholarshipEntity entity = scholarshipRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        List<ScholarshipPreferenceDto> preferences = scholarshipPreferenceMapper.toDto(scholarshipPreferenceRepository.findByScholarshipId(entity.getId()));
        ScholarshipVo scholarshipVo = scholarshipMapper.entityToVo(entity);
        scholarshipVo.setScholarshipPreferences(preferences);
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getOne(entity.getProviderId()));
        if (ObjectUtils.isNotEmpty(providerProfileVo)) {
            scholarshipVo.setProviderProfileVo(providerProfileVo);
        }
        return addScholarshipMedia(scholarshipVo);
    }

    private ScholarshipVo addScholarshipMedia(ScholarshipVo scholarshipVo) {
        List<ScholarshipMediaEntity> mediaEntity = scholarshipMediaRepository.findByScholarshipId(scholarshipVo.getId());
        if (ObjectUtils.isNotEmpty(mediaEntity)) {
            List<MediaDto> medias = this.parseResponse(mediaFeign.getByIds(mediaEntity.stream().map(ScholarshipMediaEntity::getMediaId).collect(Collectors.toList())));
            scholarshipVo.setScholarshipMedias(medias);
        }
        return scholarshipVo;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipVo create(ScholarshipVo scholarship, List<MultipartFile> images) {
        if (scholarshipRepository.isExistSlug(scholarship.getSlug())) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_SLUG_IS_ALREADY_EXIST);
        }
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getMyProviderInfo());
        if (ObjectUtils.isEmpty(providerProfileVo)) {
            throw new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST);
        }
        scholarship.setProviderId(providerProfileVo.getId());
        ScholarshipEntity savedScholarship = scholarshipRepository.saveAndFlush(scholarshipMapper.toEntity(scholarship));
        if (ObjectUtils.isNotEmpty(images)) {
            uploadImages(images, savedScholarship.getId());
        }
        List<ScholarshipPreferenceDto> scholarshipPreferences = scholarship.getScholarshipPreferences();
        if (!scholarshipPreferences.isEmpty()) {
            scholarshipPreferences.forEach(o -> {
                o.setScholarshipId(savedScholarship.getId());
            });
            scholarshipPreferenceRepository.saveAll(scholarshipPreferenceMapper.toEntity(scholarshipPreferences));
        }
        NotificationTemplateDto notificationTemplateDto = this.parseResponse(notificationTemplateFeign.getNotificationTemplate(NotificationTemplateEnum.SCHOLARSHIP_NEW.getCode()));
        NotificationVo notificationVo = NotificationVo.builder()
                .topic(NotificationTopicEnum.SCHOLARSHIP_FOLLOWER)
                .title(notificationTemplateDto.getTitle().replace("{{providerName}}", providerProfileVo.getOrganizationName()))
                .content(notificationTemplateDto.getContent().replace("{{providerName}}", providerProfileVo.getOrganizationName())
                        .replace("{{providerName}}", providerProfileVo.getOrganizationName())
                        .replace("{{scholarshipName}}", savedScholarship.getTitle()))
                .isRead(false)
                .referenceId(savedScholarship.getId())
                .referenceType(NotificationReferenceEnum.SCHOLARSHIP.getCode())
                .slug(savedScholarship.getSlug())
                .userId(UaaContextHolder.getUserId())
                .userNotificationId(notificationTemplateDto.getId())
                .build();
        kafkaProducer.convertToByteAndSend(newEventScholarshipTopic, notificationVo);
        return scholarshipMapper.entityToVo(savedScholarship);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipVo update(ScholarshipVo scholarship) {
        ScholarshipEntity entity = scholarshipRepository.findByIdAndActive(scholarship.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        scholarshipPreferenceRepository.deleteAllByScholarshipId(entity.getId());
        if (!scholarship.getScholarshipPreferences().isEmpty()) {
            scholarshipPreferenceRepository.saveAll(scholarshipPreferenceMapper.toEntity(scholarship.getScholarshipPreferences()));
        }
        scholarshipMapper.updateEntityFromVo(scholarship, entity);
        return scholarshipMapper.entityToVo(scholarshipRepository.save(entity));
    }

    private void uploadImages(List<MultipartFile> images, Long id) {
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

        applicationScholarshipRepository.softDeleteByApplicationId(id);
    }

    @Override
    public ScholarshipVo getByIdAll(Long id) {
        ScholarshipEntity entity = scholarshipRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        List<ScholarshipPreferenceDto> preferences = scholarshipPreferenceMapper.toDto(scholarshipPreferenceRepository.findByScholarshipId(entity.getId()));
        ScholarshipVo scholarshipVo = scholarshipMapper.entityToVo(entity);
        scholarshipVo.setScholarshipPreferences(preferences);
        return scholarshipVo;
    }

    @Override
    public Page<ScholarshipVo> getPage(ScholarshipFilter filter) {
        filter.beautify();
        String userId = SecurityUtil.getCurrentUserId();
        return scholarshipRepository.getPageableAuthorized(filter.getPageable(), filter.getCriteria().getUniversity(),
                filter.getCriteria().getCountry(), filter.getCriteria().getScholarshipType(),
                filter.getCriteria().getStudyLevel(), userId).map(o -> {
            ScholarshipVo scholarshipVo = scholarshipMapper.proToVo(o);
            scholarshipVo.setProviderProfileVo(this.parseResponse(providerProfileFeign.getOne(scholarshipVo.getProviderId())));
            scholarshipVo.setViews(scholarshipViewRepository.countScholarshipViewEntitiesByScholarshipId(o.getId()));
            return addScholarshipMedia(scholarshipVo);
        });
    }

    @Override
    public List<ScholarshipVo> getByIds(List<Long> ids) {
        String userId = SecurityUtil.getCurrentUserId();
        List<ScholarshipProjection> allVoByIds = scholarshipRepository.getAllVoByIds(ids, userId);
        List<ScholarshipVo> scholarshipVos = scholarshipMapper.prosToVos(allVoByIds);
        scholarshipVos.forEach(o -> {
            o.setProviderProfileVo(this.parseResponse(providerProfileFeign.getOne(o.getProviderId())));
            ScholarshipViewProjection entities = scholarshipViewRepository.getViewsByScholarshipId(o.getId());
            if (ObjectUtils.isNotEmpty(entities)) {
                o.setViews(entities.getView());
            }
            addScholarshipMedia(o);
        });
        return scholarshipVos;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean addImagesToScholarship(Long id, List<MultipartFile> mediaFiles) {
        uploadImages(mediaFiles, id);
        return true;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean deleteImagesToScholarship(Long id, List<Long> mediaIds) {
        mediaIds.forEach(mediaId -> {
            scholarshipMediaRepository.deleteByScholarshipIdAndMediaId(id, mediaId);
        });
        return true;
    }

    @Override
    public ScholarshipFollowerDto getScholarshipFollower(Long id) {
        return scholarshipFollowerMapper.toDto(scholarshipFollowerRepository.findByUserIdAndScholarshipId(UaaContextHolder.getUserId(), id));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipFollowerDto createScholarshipFollower(ScholarshipFollowerDto dto) {
        dto.setUserId(UaaContextHolder.getUserId());

        ScholarshipEntity scholarship = scholarshipRepository.findByIdAndActive(dto.getScholarshipId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST_OR_INACTIVE));

        return scholarshipFollowerMapper.toDto(
                scholarshipFollowerRepository.save(
                        scholarshipFollowerMapper.toEntity(dto)));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipFollowerDto deleteScholarshipFollower(ScholarshipFollowerDto dto) {
        String userId = UaaContextHolder.getUserId();
        scholarshipFollowerRepository.deleteByScholarshipIdAndUserId(dto.getScholarshipId(), userId);
        return dto;
    }

    @Override
    public List<ScholarshipVo> getMyScholarship() {
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getMyProviderInfo());
        List<ScholarshipEntity> scholarshipEntities = scholarshipRepository.getAllByProviderIdAndActive(providerProfileVo.getId(), true);
        List<ScholarshipVo> scholarshipVos = new ArrayList<>();
        scholarshipEntities.forEach(entity -> {
            ScholarshipVo scholarshipVo = this.getById(entity.getId());
            ScholarshipViewProjection entities = scholarshipViewRepository.getViewsByScholarshipId(scholarshipVo.getId());
            scholarshipVo.setViews(entities.getView());
            scholarshipVos.add(scholarshipVo);
        });
        return scholarshipVos;
    }

    @Override
    public List<ScholarshipVo> getScholarshipFollow() {
        List<ScholarshipVo> scholarshipVos = new ArrayList<>();
        String userId = UaaContextHolder.getUserId();
        List<ScholarshipFollowerEntity> scholarshipFollowerEntities = scholarshipFollowerRepository.getByUserId(userId);
        if (ObjectUtils.isNotEmpty(scholarshipFollowerEntities)) {
            List<ScholarshipEntity> scholarshipEntities = scholarshipRepository.findByIdIn(scholarshipFollowerEntities.stream().map(ScholarshipFollowerEntity::getScholarshipId).collect(Collectors.toList()));
            scholarshipEntities.forEach(entity -> {
                scholarshipVos.add(this.getById(entity.getId()));
            });
        }
        return scholarshipVos;
    }

    @Override
    public ScholarshipVo getBySlug(String slug) {
        String userId = SecurityUtil.getCurrentUserId();
        ScholarshipProjection projection = scholarshipRepository.getVoWithFollowBySlug(slug, userId);
        if (projection == null) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
        }
        ScholarshipVo vo = scholarshipMapper.proToVo(projection);
        vo.setProviderProfileVo(this.parseResponse(providerProfileFeign.getOne(vo.getProviderId())));

        if (userId != null) {
            if (!scholarshipViewRepository.existsByUserIdAndScholarshipId(userId, vo.getId())) {
                ScholarshipViewEntity viewEntity = new ScholarshipViewEntity();
                viewEntity.setUserId(userId);
                viewEntity.setScholarshipId(vo.getId());
                viewEntity.setFullName(SecurityUtil.getCurrentUserName());
                scholarshipViewRepository.save(viewEntity);
            }
        }
        ScholarshipViewProjection entities = scholarshipViewRepository.getViewsByScholarshipId(vo.getId());
        vo.setViews(entities.getView());
        return addScholarshipMedia(vo);
    }

    @Override
    public List<ScholarshipVo> getScholarshipByProviderId(Long id) {
        String userId = UaaContextHolder.getUserId();
        List<ScholarshipProjection> projections = scholarshipRepository.getVosWithFollowByProviderId(id, userId);
        List<ScholarshipVo> vos = scholarshipMapper.prosToVos(projections);
        vos.forEach(vo -> vo.setProviderProfileVo(this.parseResponse(providerProfileFeign.getOne(vo.getProviderId()))));
        vos.forEach(this::addScholarshipMedia);
        return vos;
    }

    @Override
    public List<ScholarshipVo> getByActiveStatus(boolean active) {
        List<ScholarshipEntity> entities = scholarshipRepository.findByActive(active);

        return entities.stream()
                .map(entity -> {
                    ScholarshipVo vo = scholarshipMapper.entityToVo(entity);
                    vo.setProviderProfileVo(this.parseResponse(providerProfileFeign.getOne(vo.getProviderId())));
                    return addScholarshipMedia(vo);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean updateScholarshipStatus(Long id, Boolean active) {
        ScholarshipEntity entity = scholarshipRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));

        scholarshipRepository.updateActiveById(id, active);
        return true;
    }

    @Override
    public List<ScholarshipViewDto> getViewsByScholarshipId(Long id) {
        return scholarshipViewMapper.toDto(scholarshipViewRepository.findByScholarshipId(id));
    }

    @Override
    public List<ScholarshipVo> getTopViewsByMonth() {
        List<ScholarshipVo> vos = new ArrayList<>();
        List<ScholarshipViewProjection> entities = scholarshipViewRepository.getTop10ViewsByMonth(LocalDate.now().getMonth().getValue());
        entities.forEach(entity -> {
            ScholarshipVo scholarshipVo = this.getById(entity.getScholarshipId());
            scholarshipVo.setViews(entity.getView());
            vos.add(scholarshipVo);
        });
        return vos;
    }

    @Override
    public List<ScholarshipViewDto> getTopScholarshipViews() {
        List<ScholarshipEntity> scholarships = scholarshipRepository.findByActive(true);

        List<ScholarshipViewDto> topList = scholarships.stream().map(s -> {
                    ScholarshipViewDto dto = new ScholarshipViewDto();
                    dto.setScholarshipId(s.getId());
                    dto.setFullName(s.getTitle());
                    dto.setViewCount((long) scholarshipViewRepository.countByScholarshipId(s.getId()));
                    return dto;
                }).sorted((a, b) -> b.getViewCount().compareTo(a.getViewCount()))
                .limit(10)
                .toList();

        return topList;
    }

    @Override
    public Boolean sendMailSuggestion(String userId) {
        List<ScholarshipVo> scholarshipEntities = this.getRecommendationScholarship(userId, 5);

        MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.SCHOLARSHIP_RECOMMENDATION.getCode()));
        String body = generateBodyEmailScholarshipSuggestion(scholarshipEntities, templateDto.getBody());
        body = body.replace("{{link}}", feEndPoint + "/scholarships");
        MailDto mailDto = new MailDto();
        mailDto.setBody(body);
        mailDto.setTo("ducm40877@gmail.com");
        mailDto.setSubject(templateDto.getSubject());
        mailDto.setTemplateId(templateDto.getId());
        kafkaProducer.convertToByteAndSend(mailTopic, mailDto);

        return true;
    }

    @Override
    public Boolean sendMailSubmittedApplication(ApplicationScholarshipDto dto) {
        String userId = UaaContextHolder.getUserId();
        List<ScholarshipVo> scholarshipEntities = this.getRecommendationScholarship(userId, 5);
        CustomerVo customerVo = this.parseResponse(customerFeign.getSimpleCustomerById(userId));

        ScholarshipDto scholarshipDto = this.getById(dto.getScholarshipId());
        ApplicationDto applicationDto = applicationService.getById(dto.getApplicationId());
        MailTemplateDto templateDto = this.parseResponse(mediaFeign.getMailTemplate(MailTypeEnum.APPLICATION_SUBMITTED.getCode()));
        String template = templateDto.getBody().replace("{{title}}", scholarshipDto.getTitle())
                .replace("{{description}}", scholarshipDto.getDescription())
                .replace("{{university}}", scholarshipDto.getUniversity())
                .replace("{{amount}}", scholarshipDto.getFundingAmount())
                .replace("{{deadline}}", DateTimeUtils.format(scholarshipDto.getEndDate(), "dd/MM/yyyy"))
                .replace("{{fullname}}", applicationDto.getFullName())
                .replace("{{scholarshipName}}", applicationDto.getFullName())
                .replace("{{universityName}}", scholarshipDto.getTitle())
                .replace("{{link}}", feEndPoint + "scholarships/" + scholarshipDto.getSlug());
        String body = generateBodyEmailScholarshipSuggestion(scholarshipEntities, template);
        MailDto mailDto = new MailDto();
        mailDto.setBody(body);
        mailDto.setTo(customerVo.getCustomer().email());
        mailDto.setSubject(templateDto.getSubject());
        mailDto.setTemplateId(templateDto.getId());
        kafkaProducer.convertToByteAndSend(mailTopic, mailDto);

        return true;
    }

    @Override
    public List<ScholarshipVo> getRecommendationScholarship(String userId, int topK) {
        ApplicantProfileVo applicantProfileVo = this.parseResponse(applicantProfileFeign.getOneByUserId(userId));
        AiRequestDto requestDto = new AiRequestDto();
        if (ObjectUtils.isEmpty(applicantProfileVo)) {
            throw new BusinessException(CoreMessageCode.APPLICANT_ID_IS_NOT_EXIST);
        }
        requestDto.setApplicantId(applicantProfileVo.getId());
        requestDto.setTopK(topK);
        ScholarshipRecommendationResponseDto recommendationScholarship = aiMatchFeign.getRecommendationScholarship(requestDto);
        List<ScholarshipVo> result = new ArrayList<>();
        if (ObjectUtils.isEmpty(recommendationScholarship.getResults())) {
            return null;
        }
        recommendationScholarship.getResults().forEach(item -> {
            ScholarshipVo vo = this.getById(item.getScholarship());
            vo.setScore(item.getSimilarityScore());
            result.add(vo);
        });
        return result;
    }

    @Override
    public List<ApplicantProfileVo> getRecommendationApplicantForScholarship(Long scholarshipId, int topK) {
        AiRequestDto requestDto = new AiRequestDto();
        requestDto.setScholarshipId(scholarshipId);
        requestDto.setTopK(topK);

        ScholarshipRecommendationResponseDto recommendationScholarship = aiMatchFeign.getRecommendationApplicantForScholarship(requestDto);
        List<ApplicantProfileVo> result = new ArrayList<>();
        if (ObjectUtils.isEmpty(recommendationScholarship.getResults())) {
            return null;
        }
        recommendationScholarship.getResults().forEach(item -> {
            ApplicantProfileVo vo = this.parseResponse(applicantProfileFeign.getOne(item.getApplicant()));
            vo.setScore(item.getSimilarityScore());
            result.add(vo);
        });
        return result;
    }

    @Override
    public String getAnalyzeResponse(Long scholarshipId) {
        ApplicantProfileVo applicantProfileVo = this.parseResponse(applicantProfileFeign.getOneByUserId(UaaContextHolder.getUserId()));
        AiRequestDto requestDto = new AiRequestDto();
        requestDto.setApplicantId(1L);
        requestDto.setScholarshipId(scholarshipId);
        return aiMatchFeign.getAnalyzeMatch(requestDto);
    }

    @Override
    public List<ScholarshipVo> getTopViewsByMonthByProvider() {
        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getMyProviderInfo());
        List<ScholarshipVo> vos = new ArrayList<>();
        List<ScholarshipViewProjection> entities = scholarshipViewRepository.getTop10ViewsByMonthAndProviderId(providerProfileVo.getId());
        entities.forEach(entity -> {
            ScholarshipVo scholarshipVo = this.getById(entity.getScholarshipId());
            scholarshipVo.setViews(entity.getView());
            vos.add(scholarshipVo);
        });
        return vos;
    }

    private String generateBodyEmailScholarshipSuggestion(List<ScholarshipVo> scholarships, String template) {
        for (int i = 0; i < scholarships.size(); i++) {
            int number = i + 1;
            template = template.replace(getKey("title", number), scholarships.get(i).getTitle())
                    .replace(getKey("description", number), scholarships.get(i).getDescription())
                    .replace(getKey("university", number), scholarships.get(i).getUniversity())
                    .replace(getKey("amount", number), scholarships.get(i).getFundingAmount())
                    .replace(getKey("deadline", number), DateTimeUtils.format(scholarships.get(i).getEndDate(), "dd/MM/yyyy"))
                    .replace(getKey("link", number), feEndPoint + "scholarships/" + scholarships.get(i).getSlug());
        }
        return template;
    }

    private String getKey(String key, int i) {
        return "{{" + key + i + "}}";
    }

    @Override
    public ScholarshipStatisticsDto getStatisticsByProvider() {

        ProviderProfileVo providerProfileVo = this.parseResponse(providerProfileFeign.getMyProviderInfo());
        if (providerProfileVo == null) {
            throw new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST);
        }
        Long providerId = providerProfileVo.getId();
        // 1. Retrieve all scholarships for the provider
        List<ScholarshipEntity> scholarships = scholarshipRepository.getAllByProviderIdAndActive(Long.valueOf(providerId), true);
        long totalScholarships = scholarships.size();

        // 2. Calculate total views
        long totalViews = scholarships.stream()
                .mapToLong(s -> scholarshipViewRepository.countByScholarshipId(s.getId()))
                .sum();

        // 3. Calculate total applies
        long totalApplies = scholarships.stream()
                .mapToLong(s -> applicationScholarshipRepository.countByScholarshipIdAndActive(s.getId()))
                .sum();

        // 4. Calculate average apply rate (apply/view)
        double averageApplyRate = totalViews > 0 ? ((double) totalApplies / totalViews) * 100 : 0;

        // 5. Calculate approve, reject, and pending rates
        long totalApproved = applicationScholarshipRepository.findByStatusAndActive("Approved", true)
                .stream()
                .filter(a -> scholarships.stream().anyMatch(s -> s.getId().equals(a.getScholarshipId())))
                .count();

        long totalRejected = applicationScholarshipRepository.findByStatusAndActive("Rejected", true)
                .stream()
                .filter(a -> scholarships.stream().anyMatch(s -> s.getId().equals(a.getScholarshipId())))
                .count();

        long totalPending = applicationScholarshipRepository.findByStatusAndActive("Pending", true)
                .stream()
                .filter(a -> scholarships.stream().anyMatch(s -> s.getId().equals(a.getScholarshipId())))
                .count();

        double approveRate = totalApplies > 0 ? ((double) totalApproved / totalApplies) * 100 : 0;
        double rejectRate = totalApplies > 0 ? ((double) totalRejected / totalApplies) * 100 : 0;
        double pendingRate = totalApplies > 0 ? ((double) totalPending / totalApplies) * 100 : 0;

        // 6. Calculate the rate of views that did not result in an application
        double viewButNoApplyRate = totalViews > 0 ? ((double) (totalViews - totalApplies) / totalViews) * 100 : 0;

        // 7. Top 5 scholarships by view count
        List<String> top5ByView = scholarships.stream()
                .sorted((a, b) -> Long.compare(
                        scholarshipViewRepository.countByScholarshipId(b.getId()),
                        scholarshipViewRepository.countByScholarshipId(a.getId())
                ))
                .limit(5)
                .map(ScholarshipEntity::getTitle)
                .toList();

        // 8. Top 5 scholarships by apply count
        List<String> top5ByApply = scholarships.stream()
                .sorted((a, b) -> Long.compare(
                        applicationScholarshipRepository.countByScholarshipIdAndActive(b.getId()),
                        applicationScholarshipRepository.countByScholarshipIdAndActive(a.getId())
                ))
                .limit(5)
                .map(ScholarshipEntity::getTitle)
                .toList();

        // Return the DTO
        return new ScholarshipStatisticsDto(
                totalScholarships, totalViews, totalApplies, averageApplyRate,
                approveRate, rejectRate, pendingRate, viewButNoApplyRate,
                top5ByView, top5ByApply
        );
    }
}
