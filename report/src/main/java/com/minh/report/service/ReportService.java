package com.minh.report.service;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.model.dto.report.*;

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

    ReportDto createProviderReport(ProviderReportCreateDto dto);

    ReportDto createProfileReport(ProfileReportCreateDto dto);

    ReportDto createScholarshipReport(ScholarshipReportCreateDto dto);

    /**
     * Thống kê số lượng report theo từng loại (PROFILE, PROVIDER, SCHOLARSHIP, SYSTEM)
     * và phân theo tháng này và tháng trước
     *
     * @return danh sách ReportStatisticsDto
     */
    List<ReportStatisticsDto> getReportStatistics();
}
