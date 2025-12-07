package com.minh.report.data.repository;

import com.minh.report.data.entity.ScholarshipReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScholarshipReportRepository extends JpaRepository<ScholarshipReportEntity, Long> {
}
