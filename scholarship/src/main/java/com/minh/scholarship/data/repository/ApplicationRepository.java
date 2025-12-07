package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ApplicationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, Long> {

    Optional<ApplicationEntity> findByIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ApplicationEntity SET active = :active WHERE id = :id")
    void updateActiveById(Long id, Boolean active);

    @Query("SELECT a " +
            "FROM ApplicationEntity a " +
            "WHERE a.active = true " +
            "ORDER BY a.createdDate DESC")
    Page<ApplicationEntity> getPageable(Pageable pageable);

    List<ApplicationEntity> findAllByUserId(String userId);

    List<ApplicationEntity> findAllByUserIdAndActive(String userId, boolean b);

    List<ApplicationEntity> findByCodeAndActive(String code, boolean b);

    Optional<ApplicationEntity> findByCodeAndVersionApplicationAndActive(String code, Long versionApplication, boolean b);
}
