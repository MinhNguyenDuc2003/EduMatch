package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.vo.projection.ScholarshipProjection;
import com.minh.scholarship.data.vo.projection.ScholarshipYearMonthCountProjection;
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

    List<ScholarshipEntity> getAllByProviderId(Long id);

    List<ScholarshipEntity> findByIdIn(List<Long> collect);

    Optional<ScholarshipEntity> findBySlug(String slug);

    @Query("SELECT COUNT(s) > 0 FROM ScholarshipEntity s WHERE s.active = true AND s.slug = :slug")
    boolean isExistSlug(@Param("slug") String slug);

    @Query("SELECT s " +
            "FROM ScholarshipEntity s " +
            "WHERE s.active = true " +
            "AND UPPER(COALESCE(s.university, '')) LIKE UPPER(CONCAT('%', :university, '%')) " +
            "AND UPPER(COALESCE(s.country, '')) LIKE UPPER(CONCAT('%', :country, '%')) " +
            "AND UPPER(COALESCE(s.scholarshipType, '')) LIKE UPPER(CONCAT('%', :scholarshipType, '%')) " +
            "AND UPPER(COALESCE(s.studyLevel, '')) LIKE UPPER(CONCAT('%', :studyLevel, '%')) " +
            "ORDER BY s.createdDate DESC ")
    Page<ScholarshipEntity> getPageable(Pageable pageable,
                                        @Param("university") String university,
                                        @Param("country") String country,
                                        @Param("scholarshipType") String scholarshipType,
                                        @Param("studyLevel") String studyLevel);

    @Query(value = "SELECT s.*, case when f.user_id is not null then 1 end as isFollow " +
            "            FROM scholarship.scholarship s " +
            "            LEFT join scholarship.scholarship_follower f on s.id = f.scholarship_id and f.user_id = :userId " +
            "            WHERE s.active = true " +
            "            AND UPPER(COALESCE(s.university, '')) LIKE UPPER(CONCAT('%', :university, '%')) " +
            "            AND UPPER(COALESCE(s.country, '')) LIKE UPPER(CONCAT('%', :country, '%')) " +
            "            AND UPPER(COALESCE(s.scholarship_type, '')) LIKE UPPER(CONCAT('%', :scholarshipType, '%')) " +
            "            AND UPPER(COALESCE(s.study_level, '')) LIKE UPPER(CONCAT('%', :studyLevel, '%'))" +
            "            ORDER BY s.created_datetime DESC ", nativeQuery = true)
    Page<ScholarshipProjection> getPageableAuthorized(Pageable pageable,
                                                      @Param("university") String university,
                                                      @Param("country") String country,
                                                      @Param("scholarshipType") String scholarshipType,
                                                      @Param("studyLevel") String studyLevel,
                                                      @Param("userId") String userId);

    @Query(value = "SELECT s.*, case when f.user_id is not null then 1 end as isFollow " +
            "            FROM scholarship.scholarship s " +
            "            LEFT join scholarship.scholarship_follower f on s.id = f.scholarship_id and f.user_id = :userId " +
            "            WHERE s.active = true and s.id IN :ids " +
            "            ORDER BY s.created_datetime DESC ", nativeQuery = true)
    List<ScholarshipProjection> getAllVoByIds(List<Long> ids, String userId);

    List<ScholarshipEntity> getAllByProviderIdAndActive(Long id, boolean b);

    @Query("SELECT s FROM ScholarshipEntity s WHERE s.active = :active")
    List<ScholarshipEntity> findByActive(@Param("active") Boolean active);


    @Query(value = "SELECT s.*, CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END AS isFollow " +
            "FROM scholarship.scholarship s " +
            "LEFT JOIN scholarship.scholarship_follower f " +
            "ON s.id = f.scholarship_id AND f.user_id = :userId " +
            "WHERE s.active = true AND UPPER(s.slug) LIKE UPPER(CONCAT('%', :slug, '%')) " +
            "LIMIT 1", nativeQuery = true)
    ScholarshipProjection getVoWithFollowBySlug(@Param("slug") String slug, @Param("userId") String userId);

    @Query(value = "SELECT s.*, CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END AS isFollow " +
            "FROM scholarship.scholarship s " +
            "LEFT JOIN scholarship.scholarship_follower f " +
            "ON s.id = f.scholarship_id AND f.user_id = :userId " +
            "WHERE s.active = true AND s.provider_id = :providerId " +
            "ORDER BY s.created_datetime DESC", nativeQuery = true)
    List<ScholarshipProjection> getVosWithFollowByProviderId(@Param("providerId") Long providerId, @Param("userId") String userId);

    List<ScholarshipEntity> findAllByProviderIdAndActive(Long id, boolean b);

    @Query(value = "select s.* from scholarship.scholarship s " +
            "inner join scholarship.application_scholarship aps on s.id = aps.scholarship_id and aps.status = :status " +
            "inner join scholarship.application a on aps.application_id = a.id and a.user_id = :userId " +
            "where s.id = :scholarshipId"
            , nativeQuery = true)
    List<ScholarshipEntity> findByApplicationSuccessAndScholarshipId(String userId, Long scholarshipId, String status);

    @Query("""
       SELECT 
           YEAR(s.createdDate) AS year,
           MONTH(s.createdDate) AS month,
           COUNT(s) AS count
       FROM ScholarshipEntity s
       GROUP BY YEAR(s.createdDate), MONTH(s.createdDate)
       ORDER BY YEAR(s.createdDate), MONTH(s.createdDate)
    """)
    List<ScholarshipYearMonthCountProjection> countScholarshipByYearAndMonth();

}