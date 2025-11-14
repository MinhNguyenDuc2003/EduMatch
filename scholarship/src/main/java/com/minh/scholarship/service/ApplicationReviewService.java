package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ApplicationReviewDto;

import java.util.List;

public interface ApplicationReviewService {
    List<ApplicationReviewDto> getAll();

    ApplicationReviewDto getById(Long id);

    ApplicationReviewDto create(ApplicationReviewDto dto);

    ApplicationReviewDto update(ApplicationReviewDto dto);

    void delete(Long id);

    List<ApplicationReviewDto> getAllByApplicationId(Long applicationId);

}
