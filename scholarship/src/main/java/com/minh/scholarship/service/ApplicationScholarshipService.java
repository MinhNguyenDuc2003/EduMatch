package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ApplicationScholarshipDto;
import java.util.List;

public interface ApplicationScholarshipService {

    List<ApplicationScholarshipDto> getAll();

    ApplicationScholarshipDto getById(Long id);

    ApplicationScholarshipDto create(ApplicationScholarshipDto dto);

    ApplicationScholarshipDto update(ApplicationScholarshipDto dto);

    void delete(Long id);

    List<ApplicationScholarshipDto> getAllByApplicationId(Long applicationId);

    List<ApplicationScholarshipDto> getAllByScholarshipId(Long scholarshipId);

    List<ApplicationScholarshipDto> getAllByStatus(String status);
}
