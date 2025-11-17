package com.minh.report.service;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.model.dto.report.ProfileReportCreateDto;
import com.minh.model.dto.report.ProviderReportCreateDto;
import com.minh.model.dto.report.ReportDto;
import com.minh.model.dto.report.ScholarshipReportCreateDto;

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
}
