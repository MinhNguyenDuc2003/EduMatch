package com.minh.scholarship.data.repository;

import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.data.entity.ScholarshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScholarshipRepository extends JpaRepository<ScholarshipEntity, Long> {

    Optional<ScholarshipEntity> findByIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ScholarshipEntity SET active = :active WHERE id = :id")
    void updateActiveById(Long id, Boolean active);

}
