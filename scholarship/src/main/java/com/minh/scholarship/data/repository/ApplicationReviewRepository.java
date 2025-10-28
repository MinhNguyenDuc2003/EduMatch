package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationReviewRepository extends JpaRepository<ApplicationReviewEntity, Long> {
    Optional<ApplicationReviewEntity> findByIdAndActive(Long id, boolean active);

    @Modifying
    @Query("UPDATE ApplicationReviewEntity a SET a.active = false WHERE a.id = :id")
    void updateActiveById(Long id);
}
