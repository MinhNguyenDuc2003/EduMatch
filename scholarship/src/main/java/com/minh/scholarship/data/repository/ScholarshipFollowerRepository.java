package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.junction.ScholarshipFollowerEntity;
import com.minh.scholarship.data.entity.junction.id.ScholarshipFollowerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipFollowerRepository extends JpaRepository<ScholarshipFollowerEntity, ScholarshipFollowerId> {

    @Modifying
    void deleteByScholarshipIdAndUserId(Long scholarshipId, String userId);

    List<ScholarshipFollowerEntity> getByUserId(String userId);

}
