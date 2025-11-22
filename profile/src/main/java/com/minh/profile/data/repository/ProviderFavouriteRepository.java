package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderFavouriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderFavouriteRepository extends JpaRepository<ProviderFavouriteEntity, Long> {

    List<ProviderFavouriteEntity> findAllByUserIdAndActive(String userId, boolean active);

    boolean existsByUserIdAndApplicantId(String userId, Long applicantId);

    List<ProviderFavouriteEntity> findAllByApplicantIdAndActive(Long applicantId, boolean active);

    List<ProviderFavouriteEntity> findAllByActive(boolean active);
}
