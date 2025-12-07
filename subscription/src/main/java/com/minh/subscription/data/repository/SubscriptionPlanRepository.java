package com.minh.subscription.data.repository;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlanEntity, Long> {

    Optional<SubscriptionPlanEntity> findByIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE SubscriptionPlanEntity s SET s.active = :active WHERE s.id = :id")
    void updateActiveById(@Param("id") Long id, @Param("active") boolean active);

    List<SubscriptionPlanEntity> findByActiveTrue();

    List<SubscriptionPlanEntity> findByTargetTypeAndActiveTrue(SubscriptionTargetType targetType);

}
