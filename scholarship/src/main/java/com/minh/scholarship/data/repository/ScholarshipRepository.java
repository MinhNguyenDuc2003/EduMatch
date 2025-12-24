package com.minh.scholarship.data.repository;

import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.vo.projection.ScholarshipCountryCountProjection;
import com.minh.scholarship.data.vo.projection.ScholarshipProjection;
import com.minh.scholarship.data.vo.projection.ScholarshipYearMonthCountProjection;
import feign.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Collection;
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
            "            WHERE s.active = true AND s.status = 'Public' and s.id IN :ids " +
            "            ORDER BY s.created_datetime DESC ", nativeQuery = true)
    List<ScholarshipProjection> getAllVoByIds(List<Long> ids, String userId);

    List<ScholarshipEntity> getAllByProviderIdAndActive(Long id, boolean b);

    @Query("SELECT s FROM ScholarshipEntity s WHERE s.active = :active")
    List<ScholarshipEntity> findByActive(@Param("active") Boolean active);


    @Query(value = "SELECT s.*, CASE WHEN f.user_id IS NOT NULL THEN 1 ELSE 0 END AS isFollow " +
            "FROM scholarship.scholarship s " +
            "LEFT JOIN scholarship.scholarship_follower f " +
            "ON s.id = f.scholarship_id AND f.user_id = :userId " +
            "WHERE s.active = true AND s.status = 'Public' AND UPPER(s.slug) LIKE UPPER(CONCAT('%', :slug, '%')) " +
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
            SELECT s
            FROM ScholarshipEntity s
            WHERE s.active = true AND s.endDate >= CURRENT_TIMESTAMP
            AND (:educationLevel IS NULL OR s.studyLevel = :educationLevel)
            AND (:country IS NULL OR s.country = :country)
            AND (s.gpaRequirement IS NULL
                        OR (:overallGpa IS NOT NULL AND :overallGpa >= s.gpaRequirement))
            AND (
                    (
                        s.requiredSatScore  IS NULL
                    AND s.requiredActScore  IS NULL
                    AND s.requiredGreScore  IS NULL
                    AND s.requiredGmatScore IS NULL
                    )
                 OR (
                        (s.requiredSatScore  IS NOT NULL AND :satScore  IS NOT NULL AND :satScore  >= s.requiredSatScore)
                     OR (s.requiredActScore  IS NOT NULL AND :actScore  IS NOT NULL AND :actScore  >= s.requiredActScore)
                     OR (s.requiredGreScore  IS NOT NULL AND :greScore  IS NOT NULL AND :greScore  >= s.requiredGreScore)
                     OR (s.requiredGmatScore IS NOT NULL AND :gmatScore IS NOT NULL AND :gmatScore >= s.requiredGmatScore)
                    )
            )
            AND (
                    (
                        s.requiredToeflScore IS NULL
                    AND s.requiredIeltsScore IS NULL
                    )
                 OR (
                        (s.requiredToeflScore IS NOT NULL AND :toeflScore IS NOT NULL AND :toeflScore >= s.requiredToeflScore)
                     OR (s.requiredIeltsScore IS NOT NULL AND :ieltsScore IS NOT NULL AND :ieltsScore >= s.requiredIeltsScore)
                    )
            )
            """)
    List<ScholarshipEntity> findByApplicantFilter(
            String educationLevel,
            BigDecimal overallGpa,
            String country,
            Integer satScore,
            Integer actScore,
            Integer greScore,
            Integer gmatScore,
            Integer toeflScore,
            Double ieltsScore
    );

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

    List<ScholarshipEntity> getByIdIn(Collection<Long> ids);

    @Query("""
                SELECT 
                    s.country AS country,
                    COUNT(s) AS total
                FROM ScholarshipEntity s
                WHERE s.active = true
                  AND s.country IS NOT NULL
                GROUP BY s.country
                ORDER BY COUNT(s) DESC
            """)
    List<ScholarshipCountryCountProjection> countTopCountry();

    @Query(value = "select SUM(sp.weight) " +
            "from scholarship.scholarship_preference sp " +
            "where sp.scholarship_id = :scholarshipId and sp.active = true ", nativeQuery = true)
    Double getTotalWeightByScholarshipId(Long scholarshipId);

    @Query(value = "select SUM(sp.weight) " +
            "from scholarship.scholarship_preference sp " +
            "where sp.scholarship_id = :scholarshipId and sp.active = true " +
            "and (sp.type = :type OR COALESCE(sp.type, '') = '') ", nativeQuery = true)
    Double getTotalWeightByScholarshipIdAndType(Long scholarshipId, String type);
}