package com.minh.subscription.data.repository;

import com.minh.subscription.data.entity.SubscriptionEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
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
    Optional<SubscriptionEntity> findCurrentSubscription(@Param("userId") String userId);

}
