package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ScholarshipDto;

import java.util.List;

public interface ScholarshipService {

    List<ScholarshipDto> getAll();

    ScholarshipDto getById(Long id);

    ScholarshipDto create(ScholarshipDto scholarship);

    ScholarshipDto update(ScholarshipDto scholarship);

    void delete(Long id);
}
