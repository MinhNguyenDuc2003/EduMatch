package com.minh.report.service;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.model.dto.report.*;
import com.minh.report.vo.ReportVo;

import java.util.List;

public interface ReportService {

    List<ReportVo> getAll();

    ReportVo getById(Long id);

    ReportDto create(ReportDto dto);

    ReportDto update(ReportDto dto);

    void delete(Long id);

    List<ReportVo> getByUserId(String userId);

    List<ReportVo> getMyReports();

    List<ReportVo> getByCategory(Long categoryId);

    List<ReportVo> getByIsRead(Boolean isRead);

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
