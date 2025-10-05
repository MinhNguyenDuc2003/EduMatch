package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderContactRepository extends JpaRepository<ProviderContactEntity, Long> {
}
