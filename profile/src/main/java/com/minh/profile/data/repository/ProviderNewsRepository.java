package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderNewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderNewsRepository extends JpaRepository<ProviderNewsEntity, Long> {
}
