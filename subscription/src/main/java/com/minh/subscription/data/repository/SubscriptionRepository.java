package com.minh.subscription.data.repository;

import com.minh.subscription.data.entity.SubscriptionEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, Long> {

    Optional<SubscriptionEntity> findByIdAndActive(Long id, boolean active);

    @Modifying
    @Query("UPDATE SubscriptionEntity s SET s.active = :active WHERE s.id = :id")
    void updateActiveById(@Param("id") Long id, @Param("active") boolean active);

    @Query(value = """
    SELECT s.* 
    FROM subscription.subscription s
    LEFT JOIN subscription.subscription_plan p ON s.plan_id = p.id
    WHERE s.user_id = :userId
      AND s.active = TRUE
      AND s.status = 'true'
      AND (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::bigint) BETWEEN (s.start_date::bigint) AND (s.end_date::bigint)
    LIMIT 1
    """, nativeQuery = true)
    Optional<SubscriptionEntity> findCurrentSubscription(@Param("userId") String userId);


}
