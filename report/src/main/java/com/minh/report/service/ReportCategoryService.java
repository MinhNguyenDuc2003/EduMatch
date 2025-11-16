package com.minh.report.service;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.model.dto.report.ReportCategoryDto;

import java.util.List;

public interface ReportCategoryService {

    List<ReportCategoryDto> getAll();

    ReportCategoryDto getById(Long id);

    ReportCategoryDto create(ReportCategoryDto dto);

    ReportCategoryDto update(ReportCategoryDto dto);

    void delete(Long id);

    List<ReportCategoryDto> getByType(ReportCategoryType type);
}
