package com.minh.report.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.report.ReportCategoryType;
import com.minh.exception.BusinessException;
import com.minh.model.dto.report.ReportDto;
import com.minh.report.data.entity.ReportEntity;
import com.minh.report.data.entity.ReportCategoryEntity;
import com.minh.report.data.mapper.ReportMapper;
import com.minh.report.data.repository.ReportCategoryRepository;
import com.minh.report.data.repository.ReportRepository;
import com.minh.report.service.ReportService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl extends BaseService implements ReportService {

    private final ReportRepository reportRepository;
    private final ReportCategoryRepository categoryRepository;
    private final ReportMapper mapper;

    @Override
    public List<ReportDto> getAll() {
        return mapper.toDto(reportRepository.findByActiveTrue());
    }

    @Override
    public ReportDto getById(Long id) {
        ReportEntity entity = reportRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_NOT_FOUND));
        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public ReportDto create(ReportDto dto) {
        String userId = UaaContextHolder.getUserId();
        dto.setUserId(userId);

        ReportEntity entity = mapper.toEntity(dto);

        if (dto.getCategory() != null && dto.getCategory().getId() != null) {
            ReportCategoryEntity category = categoryRepository
                    .findByIdAndActive(dto.getCategory().getId(), true)
                    .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_CATEGORY_NOT_FOUND));
            entity.setCategory(category);
        }

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
    public List<ReportDto> getByUserId(String userId) {
        return mapper.toDto(reportRepository.findByUserIdAndActiveTrue(userId));
    }

    @Override
    public List<ReportDto> getMyReports() {
        String userId = UaaContextHolder.getUserId();
        return mapper.toDto(reportRepository.findByUserIdAndActiveTrue(userId));
    }

    @Override
    public List<ReportDto> getByCategory(Long categoryId) {
        ReportCategoryEntity category = categoryRepository.findByIdAndActive(categoryId, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_CATEGORY_NOT_FOUND));
        return mapper.toDto(reportRepository.findByCategoryAndActiveTrue(category));
    }

    @Override
    public List<ReportDto> getByIsRead(Boolean isRead) {
        return mapper.toDto(reportRepository.findByIsReadAndActiveTrue(isRead));
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
}
