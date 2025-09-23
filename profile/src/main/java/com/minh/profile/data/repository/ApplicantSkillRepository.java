package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ApplicantSkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantSkillRepository extends JpaRepository<ApplicantSkillEntity, Long> {
    List<ApplicantSkillEntity> findAllByApplicantIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ApplicantSkillEntity a SET a.active = :active WHERE a.applicantId = :id")
    void updateActiveByApplicantId(@Param("id") Long id, @Param("active") Boolean active);

}
