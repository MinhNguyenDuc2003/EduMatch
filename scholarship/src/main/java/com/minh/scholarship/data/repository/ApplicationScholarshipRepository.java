package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationScholarshipEntity;
import com.minh.scholarship.data.vo.ApplicationScholarshipStatusStatisticVo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationScholarshipRepository extends JpaRepository<ApplicationScholarshipEntity, Long> {

    Optional<ApplicationScholarshipEntity> findByIdAndActive(Long id, boolean active);

    @Modifying
    @Query("UPDATE ApplicationScholarshipEntity e SET e.active = false WHERE e.id = :id")
    void updateActiveById(Long id);

    List<ApplicationScholarshipEntity> findByApplicationIdAndActive(Long applicationId, boolean active);

    List<ApplicationScholarshipEntity> findByScholarshipIdAndActive(Long scholarshipId, boolean active);

    List<ApplicationScholarshipEntity> findByStatusAndActive(String status, boolean active);

    List<ApplicationScholarshipEntity> findAllByScholarshipId(Long id);

    boolean existsByApplicationIdAndActive(Long applicationId, boolean active);

    boolean existsByScholarshipIdAndActive(Long scholarshipId, boolean active);

    @Transactional
    @Modifying
    @Query("UPDATE ApplicationScholarshipEntity e SET e.active = false WHERE e.applicationId = :applicationId")
    void softDeleteByApplicationId(@Param("applicationId") Long applicationId);

    @Transactional
    @Modifying
    @Query("UPDATE ApplicationScholarshipEntity e SET e.active = false WHERE e.scholarshipId = :scholarshipId")
    void softDeleteByScholarshipId(@Param("scholarshipId") Long scholarshipId);

    List<ApplicationScholarshipEntity> findByActive(boolean active);

    boolean existsByApplicationIdAndScholarshipId(Long applicationId, Long scholarshipId);

    @Query(value = "SELECT s.ID, s.TITLE, COUNT(a.ID) " +
            "FROM scholarship.APPLICATION_SCHOLARSHIP a " +
            "JOIN scholarship.SCHOLARSHIP s ON a.SCHOLARSHIP_ID = s.ID " +
            "WHERE a.STATUS = 'Pending' OR a.STATUS = 'Approved' OR a.STATUS = 'Rejected' " +
            "GROUP BY s.ID, s.TITLE " +
            "ORDER BY COUNT(a.ID) DESC", nativeQuery = true)
    List<Object[]> findTopAppliedScholarshipsRaw();

    @Query("SELECT new com.minh.scholarship.data.vo.ApplicationScholarshipStatusStatisticVo(e.status, COUNT(e.id)) " +
            "FROM ApplicationScholarshipEntity e " +
            "WHERE e.active = true " +
            "GROUP BY e.status")
    List<ApplicationScholarshipStatusStatisticVo> countApplicationsByStatus();

    @Query("SELECT COUNT(e.id) FROM ApplicationScholarshipEntity e WHERE e.active = true")
    Long countAllApplicationScholarship();

    Optional<ApplicationScholarshipEntity> findAllByScholarshipIdAndApplicationId(Long scholarshipId, Long applicationId);

    @Query("SELECT COUNT(a.id) FROM ApplicationScholarshipEntity a WHERE a.scholarshipId = :scholarshipId AND a.active = true")
    long countByScholarshipIdAndActive(@Param("scholarshipId") Long scholarshipId);

    List<ApplicationScholarshipEntity> findByActiveAndCreatedDateBetween(boolean active, LocalDateTime start, LocalDateTime end);

}
