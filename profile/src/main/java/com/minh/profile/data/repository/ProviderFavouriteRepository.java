package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderFavouriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderFavouriteRepository extends JpaRepository<ProviderFavouriteEntity, Long> {

    List<ProviderFavouriteEntity> findAllByProviderIdAndActive(Long id, boolean b);

    boolean existsByProviderIdAndUserId(Long providerId, String userId);

    boolean existsByProviderIdAndUserIdAndActive(Long providerId, String userId, boolean b);

}
