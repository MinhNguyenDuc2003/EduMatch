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
}
