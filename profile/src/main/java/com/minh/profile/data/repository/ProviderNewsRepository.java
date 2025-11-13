package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderNewsEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderNewsRepository extends JpaRepository<ProviderNewsEntity, Long> {
    List<ProviderNewsEntity> findAllByActive(boolean active);

    Optional<ProviderNewsEntity> findByIdAndActive(Long id, boolean active);

    @Modifying
    @Transactional
    @Query("UPDATE ProviderNewsEntity p SET p.active = false WHERE p.id = :id")
    void updateActiveById(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE ProviderNewsEntity p SET p.active = :active WHERE p.id = :id")
    void updateStatusById(@Param("id") Long id, @Param("active") boolean active);
}
