package com.minh.scholarship.service;

import com.minh.scholarship.data.entity.ScholarshipEntity;

import java.util.List;
import java.util.Optional;

public interface ScholarshipService {

    List<ScholarshipEntity> getAll();

    Optional<ScholarshipEntity> getById(Long id);

    ScholarshipEntity create(ScholarshipEntity scholarship);

    ScholarshipEntity update(Long id, ScholarshipEntity scholarship);

    void delete(Long id);
}
