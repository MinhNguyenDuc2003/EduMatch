package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ApplicantProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicantProfileRepository extends JpaRepository<ApplicantProfileEntity, Long> {

    Optional<ApplicantProfileEntity> findByIdAndActive(Long id, Boolean active);

    Optional<ApplicantProfileEntity> findByUserIdAndActive(String userId, Boolean active);

}
