package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationPreferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationPreferenceRepository extends JpaRepository<ApplicationPreferenceEntity, Long> {
}
