package com.minh.report.data.repository;

import com.minh.report.data.entity.ProfileReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileReportRepository extends JpaRepository<ProfileReportEntity, Long> {
}
