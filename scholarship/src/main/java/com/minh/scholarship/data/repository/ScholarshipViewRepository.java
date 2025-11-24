package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ScholarshipViewEntity;
import com.minh.scholarship.data.vo.projection.ScholarshipViewProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipViewRepository extends JpaRepository<ScholarshipViewEntity, Long> {
    List<ScholarshipViewEntity> findByScholarshipId(Long id);

    int countScholarshipViewEntitiesByScholarshipId(Long scholarshipId);

    boolean existsByUserIdAndScholarshipId(String userId, Long id);

    @Query(value = "WITH views AS ( " +
            "    SELECT  " +
            "        v.scholarship_id as scholarshipId, " +
            "        COUNT(v.user_id) AS view " +
            "    FROM scholarship.scholarship_view v " +
            "    WHERE EXTRACT(MONTH FROM v.created_datetime) = :month " +
            "    GROUP BY v.scholarship_id " +
            ") " +
            "SELECT * " +
            "FROM views " +
            "ORDER BY view DESC " +
            "LIMIT 10;", nativeQuery = true)
    List<ScholarshipViewProjection> getTop10ViewsByMonth(int month);

    @Query("SELECT COUNT(v.id) FROM ScholarshipViewEntity v WHERE v.active = true")
    Long countAllViews();

    @Query(value = "WITH views AS ( " +
            "    SELECT  " +
            "        v.scholarship_id as scholarshipId, " +
            "        COUNT(v.user_id) AS view " +
            "    FROM scholarship.scholarship_view v " +
            "    INNER JOIN scholarship.scholarship s ON v.scholarship_id = s.id " +
            "    WHERE s.provider_id = :id " +
            "    GROUP BY v.scholarship_id " +
            ") " +
            "SELECT * " +
            "FROM views " +
            "ORDER BY view DESC " +
            "LIMIT 10;", nativeQuery = true)
    List<ScholarshipViewProjection> getTop10ViewsByMonthAndProviderId(Long id);

    @Query(value = "WITH views AS ( " +
            "    SELECT  " +
            "        v.scholarship_id as scholarshipId, " +
            "        COUNT(v.user_id) AS view " +
            "    FROM scholarship.scholarship_view v " +
            "    INNER JOIN scholarship.scholarship s ON v.scholarship_id = s.id " +
            "    WHERE s.id = :id " +
            "    GROUP BY v.scholarship_id " +
            ") " +
            "SELECT * " +
            "FROM views " +
            "ORDER BY view DESC ", nativeQuery = true)
    ScholarshipViewProjection getViewsByScholarshipId(Long id);

    Long countByScholarshipId(Long scholarshipId);
}
