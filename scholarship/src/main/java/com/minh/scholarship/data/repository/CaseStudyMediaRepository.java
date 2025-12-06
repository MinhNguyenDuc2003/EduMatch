package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.CaseStudyMediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseStudyMediaRepository extends JpaRepository<CaseStudyMediaEntity, Long> {
}
