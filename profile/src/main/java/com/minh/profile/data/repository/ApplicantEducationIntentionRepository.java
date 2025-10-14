package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ApplicantEducationIntentionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantEducationIntentionRepository extends JpaRepository<ApplicantEducationIntentionEntity, Long> {

    List<ApplicantEducationIntentionEntity> findAllByApplicantIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ApplicantEducationIntentionEntity SET active = :active WHERE applicantId = :id")
    void updateActiveByApplicantId(Long id, Boolean active);
}
