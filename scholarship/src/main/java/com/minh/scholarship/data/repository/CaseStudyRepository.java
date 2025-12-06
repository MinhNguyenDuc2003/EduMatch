package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.CaseStudyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudyEntity, Long> {

    List<CaseStudyEntity> findAllByScholarshipId(Long scholarshipId);

    List<CaseStudyEntity> findAllByScholarshipIdAndVerified(Long scholarshipId, boolean b);
    
}
