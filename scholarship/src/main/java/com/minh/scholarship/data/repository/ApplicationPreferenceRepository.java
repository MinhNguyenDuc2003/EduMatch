package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationPreferenceRepository extends JpaRepository<ApplicationEntity, Long> {
}
