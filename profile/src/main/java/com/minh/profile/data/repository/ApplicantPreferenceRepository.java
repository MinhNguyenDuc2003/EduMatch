package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ApplicantPreferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantPreferenceRepository extends JpaRepository<ApplicantPreferenceEntity, Long> {

    @Modifying
    @Query("UPDATE ApplicantPreferenceEntity SET active = :active WHERE applicantId = :id")
    void updateActiveByApplicantId(Long id, boolean active);

    List<ApplicantPreferenceEntity> findAllByApplicantIdAndActive(Long applicantId, boolean active);

}
