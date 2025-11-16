package com.minh.report.service;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.model.dto.report.ReportDto;

import java.util.List;

public interface ReportService {

    List<ReportDto> getAll();

    ReportDto getById(Long id);

    ReportDto create(ReportDto dto);

    ReportDto update(ReportDto dto);

    void delete(Long id);

    List<ReportDto> getByUserId(String userId);

    List<ReportDto> getMyReports();

    List<ReportDto> getByCategory(Long categoryId);

    List<ReportDto> getByIsRead(Boolean isRead);

    ReportDto replyToReport(Long id, String reply);
}
