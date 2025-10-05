package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderProfileRepository extends JpaRepository<ProviderProfileEntity, Long> {
}
