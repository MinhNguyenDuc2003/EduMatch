package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ScholarshipViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipViewRepository extends JpaRepository<ScholarshipViewEntity, Long> {
    List<ScholarshipViewEntity> findByScholarshipId(Long id);

    int countScholarshipViewEntitiesByScholarshipId(Long scholarshipId);
}
