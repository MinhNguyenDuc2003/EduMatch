package com.minh.report.data.repository;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.report.data.entity.ReportEntity;
import com.minh.report.data.entity.ReportCategoryEntity;
import com.minh.report.vo.projection.ReportCountByType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

    List<ReportEntity> findByActiveTrueOrderByCreatedDateDesc();

    Optional<ReportEntity> findByIdAndActive(Long id, boolean active);

    List<ReportEntity> findByUserIdAndActiveTrue(String userId);

    List<ReportEntity> findByCategoryAndActiveTrue(ReportCategoryEntity category);

    List<ReportEntity> findByIsReadAndActiveTrue(Boolean isRead);

    @Modifying
    @Query("update ReportEntity r set r.active = false where r.id = :id")
    void deactivateById(Long id);

    // Thống kê số lượng theo type trong khoảng thời gian
    @Query("""
            SELECT r.category.type AS type, COUNT(r) AS count
            FROM ReportEntity r
            WHERE r.active = true
              AND r.createdDate BETWEEN :start AND :end
            GROUP BY r.category.type
            """)
    List<ReportCountByType> countReportsByType(LocalDateTime start, LocalDateTime end);
}
