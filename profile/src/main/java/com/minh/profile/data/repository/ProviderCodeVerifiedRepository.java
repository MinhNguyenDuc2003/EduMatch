package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderCodeVerifiedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderCodeVerifiedRepository extends JpaRepository<ProviderCodeVerifiedEntity, Long> {

    @Query("SELECT p FROM ProviderCodeVerifiedEntity p " +
            "WHERE p.userId = :userId AND p.code = :code AND p.expiredTime > CURRENT_TIMESTAMP ")
    List<ProviderCodeVerifiedEntity> findByUserIdAndCodeValid(String userId, String code);
}
