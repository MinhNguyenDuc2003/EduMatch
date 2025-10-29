package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ScholarshipPreferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipPreferenceRepository extends JpaRepository<ScholarshipPreferenceEntity, Long> {
    List<ScholarshipPreferenceEntity> findByScholarshipId(Long scholarshipId);

    void deleteAllByScholarshipId(Long id);
}
