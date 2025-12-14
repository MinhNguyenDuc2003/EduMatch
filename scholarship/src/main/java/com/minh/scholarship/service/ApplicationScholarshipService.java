package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ApplicationScholarshipDto;
import com.minh.scholarship.data.vo.ApplicationScholarshipVo;
import com.minh.scholarship.data.vo.ScholarshipApplyStatisticVo;
import com.minh.scholarship.data.vo.ScholarshipDashboardVo;

import java.util.List;

public interface ApplicationScholarshipService {

    List<ApplicationScholarshipVo> getAll();

    ApplicationScholarshipVo getById(Long id);

    ApplicationScholarshipDto create(ApplicationScholarshipDto dto);

    ApplicationScholarshipDto update(ApplicationScholarshipDto dto);

    void delete(Long id);

    List<ApplicationScholarshipVo> getAllByApplicationId(Long applicationId);

    List<ApplicationScholarshipVo> getAllByScholarshipId(Long scholarshipId);

    List<ApplicationScholarshipDto> getAllByStatus(String status);

    List<ApplicationScholarshipVo> getByMyScholarship();

    List<ScholarshipApplyStatisticVo> getTopAppliedScholarships();

    ScholarshipDashboardVo getDashboardStatistics();

    List<ApplicationScholarshipVo> getRankApplication(Long scholarshipId);

    ApplicationScholarshipVo getByScholarshipIdAndApplicationId(Long scholarshipId, Long applicationId);

    List<ApplicationScholarshipVo> getByMyProvider();
}
