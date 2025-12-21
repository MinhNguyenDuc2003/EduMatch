package com.minh.report.data.repository;

import com.minh.report.data.entity.ProfileReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileReportRepository extends JpaRepository<ProfileReportEntity, Long> {
    Optional<ProfileReportEntity> findByReportId(Long reportId);
}
