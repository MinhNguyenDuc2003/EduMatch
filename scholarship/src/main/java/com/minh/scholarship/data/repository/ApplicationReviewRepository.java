package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationReviewRepository extends JpaRepository<ApplicationReviewEntity, Long> {
}
