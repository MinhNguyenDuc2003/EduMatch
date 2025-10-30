package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationAttributeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationAttributeRepository extends JpaRepository<ApplicationAttributeEntity, Long> {
}
