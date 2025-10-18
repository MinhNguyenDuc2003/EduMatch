package com.minh.scholarship.data.repository;

import com.minh.model.dto.scholarship.ApplicationDto;
import com.minh.scholarship.data.entity.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {

    Optional<ApplicationEntity> findByIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ApplicationEntity SET active = :active WHERE id = :id")
    void updateActiveById(Long id, Boolean active);

}
