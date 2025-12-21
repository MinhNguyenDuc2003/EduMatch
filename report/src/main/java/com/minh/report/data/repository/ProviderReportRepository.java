package com.minh.report.data.repository;

import com.minh.report.data.entity.ProviderReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProviderReportRepository extends JpaRepository<ProviderReportEntity, Long> {
    Optional<ProviderReportEntity> findByReportId(Long reportId);
}
