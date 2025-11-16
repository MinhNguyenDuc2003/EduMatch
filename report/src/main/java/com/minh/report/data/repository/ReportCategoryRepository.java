package com.minh.report.data.repository;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.report.data.entity.ReportCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReportCategoryRepository extends JpaRepository<ReportCategoryEntity, Long> {

    List<ReportCategoryEntity> findByActiveTrue();

    Optional<ReportCategoryEntity> findByIdAndActive(Long id, boolean active);

    List<ReportCategoryEntity> findByTypeAndActiveTrue(ReportCategoryType type);

    @Modifying
    @Query("update ReportCategoryEntity r set r.active = false where r.id = :id")
    void deactivateById(Long id);
}
