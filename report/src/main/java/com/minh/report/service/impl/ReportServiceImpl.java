package com.minh.report.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.report.ReportCategoryType;
import com.minh.exception.BusinessException;
import com.minh.model.dto.report.*;
import com.minh.report.data.entity.*;
import com.minh.report.data.mapper.ReportMapper;
import com.minh.report.data.repository.*;
import com.minh.report.feign.ApplicantProfileFeign;
import com.minh.report.feign.CustomerFeign;
import com.minh.report.feign.ProviderProfileFeign;
import com.minh.report.service.ReportService;
import com.minh.report.vo.ApplicantProfileVo;
import com.minh.report.vo.CustomerVo;
import com.minh.report.vo.ProviderProfileVo;
import com.minh.report.vo.ReportVo;
import com.minh.report.vo.projection.ReportCountByType;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl extends BaseService implements ReportService {

    private final ReportRepository reportRepository;
    private final ReportCategoryRepository categoryRepository;
    private final ProviderReportRepository providerReportRepository;
    private final ProfileReportRepository profileReportRepository;
    private final ScholarshipReportRepository scholarshipReportRepository;
    private final ReportMapper mapper;
    private final CustomerFeign customerFeign;
    private final ProviderProfileFeign providerProfileFeign;
    private final ApplicantProfileFeign applicantProfileFeign;

    @Override
    public List<ReportVo> getAll() {

        List<ReportVo> vos = mapper.toVo(
                reportRepository.findByActiveTrueOrderByCreatedDateDesc()
        );

        vos.forEach(vo -> {

            CustomerVo customerVo = parseResponse(
                    customerFeign.getSimpleCustomerById(vo.getUserId())
            );
            if (customerVo != null) {
                vo.setCustomer(customerVo.getCustomer());
            }

            ApplicantProfileVo applicantProfile = parseResponse(
                    applicantProfileFeign.getOneByUserId(vo.getUserId())
            );
            vo.setApplicantProfile(applicantProfile);

            ProviderProfileVo providerProfile = parseResponse(
                    providerProfileFeign.getOneByUserId(vo.getUserId())
            );
            vo.setProviderProfile(providerProfile);

        });

        return vos;
    }

    @Override
    public ReportVo getById(Long id) {

        ReportEntity entity = reportRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_NOT_FOUND));

        ReportVo vo = mapper.toVo(entity);

        // ===== CUSTOMER =====
        CustomerVo customerVo = parseResponse(
                customerFeign.getSimpleCustomerById(vo.getUserId())
        );
        if (customerVo != null) {
            vo.setCustomer(customerVo.getCustomer());
        }

        // ===== APPLICANT PROFILE =====
        ApplicantProfileVo applicantProfile = parseResponse(
                applicantProfileFeign.getOneByUserId(vo.getUserId())
        );
        vo.setApplicantProfile(applicantProfile);

        // ===== PROVIDER PROFILE =====
        ProviderProfileVo providerProfile = parseResponse(
                providerProfileFeign.getOneByUserId(vo.getUserId())
        );
        vo.setProviderProfile(providerProfile);

        return vo;
    }

    @Override
    @Transactional
    public ReportDto create(ReportDto dto) {

        String userId = UaaContextHolder.getUserId();
        dto.setUserId(userId);

        ReportCategoryEntity category =
                validateCategory(dto.getCategory().getId(), ReportCategoryType.SYSTEM);

        ReportEntity entity = mapper.toEntity(dto);
        entity.setCategory(category);

        return mapper.toDto(reportRepository.save(entity));
    }

    @Override
    @Transactional
    public ReportDto update(ReportDto dto) {
        ReportEntity entity = reportRepository.findByIdAndActive(dto.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_NOT_FOUND));

        String currentUserId = UaaContextHolder.getUserId();
        if (!entity.getUserId().equals(currentUserId)) {
            throw new BusinessException(CoreMessageCode.ACCESS_DENIED);
        }

        mapper.updateEntityFromDto(dto, entity);

        if (dto.getCategory() != null && dto.getCategory().getId() != null) {
            ReportCategoryEntity category = categoryRepository.findByIdAndActive(dto.getCategory().getId(), true)
                    .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_CATEGORY_NOT_FOUND));
            entity.setCategory(category);
        }

        return mapper.toDto(reportRepository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        reportRepository.deactivateById(id);
    }

    @Override
    public List<ReportVo> getByUserId(String userId) {
        List<ReportEntity> entities = reportRepository.findByUserIdAndActiveTrue(userId);
        List<ReportVo> vos = mapper.toVo(entities);

        vos.forEach(vo -> {
            CustomerVo customerVo = this.parseResponse(
                    customerFeign.getSimpleCustomerById(vo.getUserId())
            );
            if (customerVo != null) {
                vo.setCustomer(customerVo.getCustomer());
            }
        });

        return vos;
    }

    @Override
    public List<ReportVo> getMyReports() {
        String userId = UaaContextHolder.getUserId();

        List<ReportVo> vos = mapper.toVo(
                reportRepository.findByUserIdAndActiveTrue(userId)
        );

        vos.forEach(vo -> {
            CustomerVo customerVo = this.parseResponse(
                    customerFeign.getSimpleCustomerById(vo.getUserId())
            );

            if (customerVo != null) {
                vo.setCustomer(customerVo.getCustomer());
            }
        });

        return vos;
    }

    @Override
    public List<ReportVo> getByCategory(Long categoryId) {

        ReportCategoryEntity category = categoryRepository
                .findByIdAndActive(categoryId, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_CATEGORY_NOT_FOUND));

        List<ReportVo> vos = mapper.toVo(
                reportRepository.findByCategoryAndActiveTrue(category)
        );

        vos.forEach(vo -> {
            CustomerVo customerVo = this.parseResponse(
                    customerFeign.getSimpleCustomerById(vo.getUserId())
            );

            if (customerVo != null) {
                vo.setCustomer(customerVo.getCustomer());
            }
        });

        return vos;
    }

    @Override
    public List<ReportVo> getByIsRead(Boolean isRead) {

        List<ReportVo> vos = mapper.toVo(
                reportRepository.findByIsReadAndActiveTrue(isRead)
        );

        vos.forEach(vo -> {
            CustomerVo customerVo = this.parseResponse(
                    customerFeign.getSimpleCustomerById(vo.getUserId())
            );

            if (customerVo != null) {
                vo.setCustomer(customerVo.getCustomer());
            }
        });

        return vos;
    }

    @Override
    @Transactional
    public ReportDto replyToReport(Long id, String reply) {
        ReportEntity entity = reportRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_NOT_FOUND));
        entity.setResponse(reply);
        entity.setStatus(com.minh.enumeration.report.ReportStatus.RESOLVED);
        entity.setIsRead(true);
        return mapper.toDto(reportRepository.save(entity));
    }

    @Override
    @Transactional
    public ReportDto createProviderReport(ProviderReportCreateDto dto) {

        String userId = UaaContextHolder.getUserId();

        // Chỉ cho phép chọn category type = PROVIDER
        ReportCategoryEntity category =
                validateCategory(dto.getCategoryId(), ReportCategoryType.PROVIDER);

        ReportEntity report = ReportEntity.builder()
                .userId(userId)
                .title(dto.getTitle())
                .comment(dto.getComment())
                .category(category)
                .isRead(false)
                .status(com.minh.enumeration.report.ReportStatus.PENDING)
                .build();

        reportRepository.save(report);

        ProviderReportEntity providerReport = ProviderReportEntity.builder()
                .report(report)
                .providerId(dto.getProviderId())
                .build();

        providerReportRepository.save(providerReport);

        return mapper.toDto(report);
    }

    @Override
    @Transactional
    public ReportDto createProfileReport(ProfileReportCreateDto dto) {

        String userId = UaaContextHolder.getUserId();

        // Chỉ cho phép chọn category type = PROFILE
        ReportCategoryEntity category =
                validateCategory(dto.getCategoryId(), ReportCategoryType.PROFILE);

        ReportEntity report = ReportEntity.builder()
                .userId(userId)
                .title(dto.getTitle())
                .comment(dto.getComment())
                .category(category)
                .isRead(false)
                .status(com.minh.enumeration.report.ReportStatus.PENDING)
                .build();

        reportRepository.save(report);

        ProfileReportEntity profileReport = ProfileReportEntity.builder()
                .report(report)
                .profileId(dto.getProfileId())
                .build();

        profileReportRepository.save(profileReport);

        return mapper.toDto(report);
    }

    @Override
    @Transactional
    public ReportDto createScholarshipReport(ScholarshipReportCreateDto dto) {

        String userId = UaaContextHolder.getUserId();

        // Chỉ cho phép chọn category type = SCHOLARSHIP
        ReportCategoryEntity category =
                validateCategory(dto.getCategoryId(), ReportCategoryType.SCHOLARSHIP);

        ReportEntity report = ReportEntity.builder()
                .userId(userId)
                .title(dto.getTitle())
                .comment(dto.getComment())
                .category(category)
                .isRead(false)
                .status(com.minh.enumeration.report.ReportStatus.PENDING)
                .build();

        reportRepository.save(report);

        ScholarshipReportEntity scholarshipReport = ScholarshipReportEntity.builder()
                .report(report)
                .scholarshipId(dto.getScholarshipId())
                .build();

        scholarshipReportRepository.save(scholarshipReport);

        return mapper.toDto(report);
    }

    public List<ReportStatisticsDto> getReportStatistics() {

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime startOfThisMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfThisMonth = startOfThisMonth.plusMonths(1).minusNanos(1);

        LocalDateTime startOfLastMonth = startOfThisMonth.minusMonths(1);
        LocalDateTime endOfLastMonth = startOfThisMonth.minusNanos(1);

        List<ReportCountByType> thisMonthData = reportRepository.countReportsByType(startOfThisMonth, endOfThisMonth);
        List<ReportCountByType> lastMonthData = reportRepository.countReportsByType(startOfLastMonth, endOfLastMonth);

        List<ReportStatisticsDto> result = new ArrayList<>();
        for (ReportCategoryType type : ReportCategoryType.values()) {
            long thisMonthCount = thisMonthData.stream()
                    .filter(r -> r.getType() == type)
                    .mapToLong(ReportCountByType::getCount)
                    .sum();

            long lastMonthCount = lastMonthData.stream()
                    .filter(r -> r.getType() == type)
                    .mapToLong(ReportCountByType::getCount)
                    .sum();

            result.add(new ReportStatisticsDto(type, thisMonthCount, lastMonthCount));
        }

        return result;
    }

    private ReportCategoryEntity validateCategory(Long categoryId, ReportCategoryType expectedType) {
        ReportCategoryEntity category = categoryRepository
                .findByIdAndActive(categoryId, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_CATEGORY_NOT_FOUND));

        if (category.getType() != expectedType) {
            throw new BusinessException(CoreMessageCode.INVALID_REPORT_CATEGORY_TYPE);
        }

        return category;
    }

}
