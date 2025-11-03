package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ScholarshipEntity;
import feign.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScholarshipRepository extends JpaRepository<ScholarshipEntity, Long> {

    Optional<ScholarshipEntity> findByIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE ScholarshipEntity SET active = :active WHERE id = :id")
    void updateActiveById(Long id, Boolean active);

    @Query("SELECT s " +
            "FROM ScholarshipEntity s " +
            "WHERE s.active = true " +
            "ORDER BY s.createdDate DESC ")
    Page<ScholarshipEntity> getPageable(Pageable pageable);

    List<ScholarshipEntity> getAllByProviderId(Long id);

    List<ScholarshipEntity> findByIdIn(List<Long> collect);

    Optional<ScholarshipEntity> findBySlug(String slug);

    @Query("SELECT COUNT(s) > 0 FROM ScholarshipEntity s WHERE s.active = true AND s.slug = :slug")
    boolean isExistSlug(@Param("slug") String slug);

}
