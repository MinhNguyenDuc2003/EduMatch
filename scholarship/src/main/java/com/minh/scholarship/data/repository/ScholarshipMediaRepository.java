package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.junction.ScholarshipMediaEntity;
import com.minh.scholarship.data.entity.junction.id.ScholarshipMediaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipMediaRepository extends JpaRepository<ScholarshipMediaEntity, ScholarshipMediaId> {
    void deleteAllByScholarshipId(Long scholarshipId);

    List<ScholarshipMediaEntity> findByScholarshipId(Long id);
}