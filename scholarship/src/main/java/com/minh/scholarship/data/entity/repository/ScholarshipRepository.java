package com.minh.scholarship.data.entity.repository;

import com.minh.scholarship.data.entity.ScholarshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScholarshipRepository extends JpaRepository<ScholarshipEntity, Long> {
}
