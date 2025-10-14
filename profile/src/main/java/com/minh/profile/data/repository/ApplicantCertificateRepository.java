package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ApplicantCertificateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantCertificateRepository extends JpaRepository<ApplicantCertificateEntity, Long> {

    List<ApplicantCertificateEntity> findAllByApplicantIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ApplicantCertificateEntity SET active = :active WHERE applicantId = :id")
    void updateActiveByApplicantId(Long id, Boolean active);
}
