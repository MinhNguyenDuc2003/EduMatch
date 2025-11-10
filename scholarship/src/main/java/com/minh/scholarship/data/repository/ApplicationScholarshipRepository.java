package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationScholarshipEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

}
