package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationAttributeEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationAttributeRepository extends JpaRepository<ApplicationAttributeEntity, Long> {

    @Query(value = "SELECT * FROM scholarship.application_attribute WHERE application_id = :applicationId", nativeQuery = true)
    List<ApplicationAttributeEntity> findAllByApplicationId(@Param("applicationId") Long applicationId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM scholarship.application_attribute WHERE application_id = :applicationId", nativeQuery = true)
    void deleteAllByApplicationId(@Param("applicationId") Long applicationId);
}

