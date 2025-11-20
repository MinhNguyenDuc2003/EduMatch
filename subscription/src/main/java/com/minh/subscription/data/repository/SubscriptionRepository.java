package com.minh.subscription.data.repository;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, Long> {

    Optional<SubscriptionEntity> findByIdAndActive(Long id, boolean active);

    @Modifying
    @Query("UPDATE SubscriptionEntity s SET s.active = :active WHERE s.id = :id")
    void updateActiveById(@Param("id") Long id, @Param("active") boolean active);

    @Query("""
            SELECT s
            FROM SubscriptionEntity s
            WHERE s.userId = :userId
            """)
    List<SubscriptionEntity> findAllByUserId(@Param("userId") String userId);

    @Query(value = """
            SELECT s FROM SubscriptionEntity s
            JOIN FETCH s.plan p
            WHERE s.userId = :userId
              AND s.active = TRUE
              AND s.status = 'true'
              AND CURRENT_TIMESTAMP BETWEEN s.startDate AND s.endDate
            """)
    List<SubscriptionEntity> findCurrentSubscription(@Param("userId") String userId);

    List<SubscriptionPlanEntity> findByActiveTrue();

    Optional<SubscriptionEntity> findByUserIdAndUserTypeAndStatus(String userId,
                                                                  SubscriptionTargetType userType,
                                                                  String status);

    @Query("SELECT s FROM SubscriptionEntity s " +
            "WHERE s.userId = :userId " +
            "AND s.active = true " +
            "ORDER BY s.endDate DESC")
    Optional<SubscriptionEntity> findActiveSubscriptionByUserId(@Param("userId") String userId);

    Optional<SubscriptionEntity> findByUserIdAndActiveTrue(String userId);
}
