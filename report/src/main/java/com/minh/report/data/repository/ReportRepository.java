package com.minh.report.data.repository;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.report.data.entity.ReportEntity;
import com.minh.report.data.entity.ReportCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

    List<ReportEntity> findByActiveTrue();

    Optional<ReportEntity> findByIdAndActive(Long id, boolean active);

    List<ReportEntity> findByUserIdAndActiveTrue(String userId);

    List<ReportEntity> findByCategoryAndActiveTrue(ReportCategoryEntity category);

    List<ReportEntity> findByIsReadAndActiveTrue(Boolean isRead);

    @Modifying
    @Query("update ReportEntity r set r.active = false where r.id = :id")
    void deactivateById(Long id);
}
