package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderFavouriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderFavouriteRepository extends JpaRepository<ProviderFavouriteEntity, Long> {

    boolean existsByProviderIdAndUserId(String providerId, Long userId);

    List<ProviderFavouriteEntity> findAllByProviderIdAndActive(String providerId, Boolean active);

    List<ProviderFavouriteEntity> findAllByUserIdAndActive(Long userId, Boolean active);

    List<ProviderFavouriteEntity> findAllByActive(Boolean active);
}
