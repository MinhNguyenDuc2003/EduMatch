package com.minh.profile.data.repository;

import com.minh.profile.data.entity.junction.ProviderFollowerEntity;
import com.minh.profile.data.entity.junction.id.ProviderFollowerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderFollowerRepository extends JpaRepository<ProviderFollowerEntity, ProviderFollowerId> {
    @Modifying
    void deleteByProviderIdAndUserId(Long id, String userId);

    List<ProviderFollowerEntity> findByProviderId(Long providerId);

    List<ProviderFollowerEntity> findByUserId(String userId);

    boolean existsByProviderIdAndUserId(Long providerId, String userId);

}
