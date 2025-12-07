package com.minh.report.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.report.ReportCategoryType;
import com.minh.exception.BusinessException;
import com.minh.model.dto.report.ReportCategoryDto;
import com.minh.report.data.entity.ReportCategoryEntity;
import com.minh.report.data.mapper.ReportCategoryMapper;
import com.minh.report.data.repository.ReportCategoryRepository;
import com.minh.report.service.ReportCategoryService;
import com.minh.service.base.BaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportCategoryServiceImpl extends BaseService implements ReportCategoryService {

    private final ReportCategoryRepository reportCategoryRepository;
    private final ReportCategoryMapper mapper;

    @Override
    public List<ReportCategoryDto> getAll() {
        return mapper.toDto(reportCategoryRepository.findByActiveTrue());
    }

    @Override
    public ReportCategoryDto getById(Long id) {
        ReportCategoryEntity entity = reportCategoryRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_CATEGORY_NOT_FOUND));
        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public ReportCategoryDto create(ReportCategoryDto dto) {
        ReportCategoryEntity entity = mapper.toEntity(dto);
        return mapper.toDto(reportCategoryRepository.save(entity));
    }

    @Override
    @Transactional
    public ReportCategoryDto update(ReportCategoryDto dto) {
        ReportCategoryEntity entity = reportCategoryRepository.findByIdAndActive(dto.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.REPORT_CATEGORY_NOT_FOUND));

        mapper.updateEntityFromDto(dto, entity);

        return mapper.toDto(reportCategoryRepository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        reportCategoryRepository.deactivateById(id);
    }

    @Override
    public List<ReportCategoryDto> getByType(ReportCategoryType type) {
        return mapper.toDto(reportCategoryRepository.findByTypeAndActiveTrue(type));
    }
}
