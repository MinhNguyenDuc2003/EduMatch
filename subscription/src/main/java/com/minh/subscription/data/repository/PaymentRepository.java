package com.minh.subscription.data.repository;

import com.minh.subscription.data.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

    Optional<PaymentEntity> findByIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE PaymentEntity p SET p.active = false WHERE p.id = :id")
    void updateActiveById(@Param("id") Long id);
}
