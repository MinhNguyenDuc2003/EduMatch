package com.minh.search.service;

import com.minh.model.dto.scholarship.ScholarshipDto;

public interface ScholarshipSyncDataService {

    ScholarshipDto getScholarshipById(Long scholarshipId);

    void create(Long scholarshipId);

    void update(Long scholarshipId);

    void deleteById(Long scholarshipId);

}
