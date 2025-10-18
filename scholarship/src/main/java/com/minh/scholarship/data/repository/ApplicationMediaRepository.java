package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.junction.ApplicationMediaEntity;
import com.minh.scholarship.data.entity.junction.id.ApplicationMediaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationMediaRepository extends JpaRepository<ApplicationMediaEntity, ApplicationMediaId> {
    void deleteAllByApplicationId(Long applicationId);

    List<ApplicationMediaEntity> findAllByApplicationId(Long applicationId);
}
