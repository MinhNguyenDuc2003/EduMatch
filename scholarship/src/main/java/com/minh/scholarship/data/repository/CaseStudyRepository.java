package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.CaseStudyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudyEntity, Long> {
}
