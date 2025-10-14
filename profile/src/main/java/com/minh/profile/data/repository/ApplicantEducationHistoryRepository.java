package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ApplicantEducationHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantEducationHistoryRepository extends JpaRepository<ApplicantEducationHistoryEntity, Long> {

    List<ApplicantEducationHistoryEntity> findAllByApplicantIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ApplicantEducationHistoryEntity SET active = :active WHERE applicantId = :id")
    void updateActiveByApplicantId(Long id, Boolean active);

}
