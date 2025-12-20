package com.minh.profile.data.repository;

import com.minh.enumeration.applicantprofile.ProfileType;
import com.minh.profile.data.entity.ApplicantProfileEntity;
import com.minh.profile.data.vo.projection.CountryCountProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicantProfileRepository extends JpaRepository<ApplicantProfileEntity, Long> {

    Optional<ApplicantProfileEntity> findByIdAndActive(Long id, Boolean active);

    Optional<ApplicantProfileEntity> findByUserIdAndActive(String userId, Boolean active);

    @Query("""
    SELECT a
    FROM ApplicantProfileEntity a
    WHERE a.active = true
      AND UPPER(a.type) = 'CURRENT'
    """)
    List<ApplicantProfileEntity> findAllCurrentProfiles();


    @Query(value = "       select a.*  " +
            "                    from profile.applicant_profile a  " +
            "                    where 1=1 " +
            "                      and a.active = true  " +
            "                      and (:studyLevel is null or a.education_level = :studyLevel)  " +
            "                      AND (  " +
            "                          :restrictedNationalities IS NULL  " +
            "                       OR cardinality(CAST(:restrictedNationalities AS text[])) = 0  " +
            "                       OR a.hometown = ANY(CAST(:restrictedNationalities AS text[]))  " +
            "                    ) " +
            "                      and (:gpaRequirement is null or a.overall_gpa >= :gpaRequirement)  " +
            "                      and (  " +
            "                            (CAST(:requiredSatScore  AS INTEGER) IS NULL OR a.sat_score  >= :requiredSatScore)  " +
            "                         OR (CAST(:requiredActScore  AS INTEGER) IS NULL OR a.act_score  >= :requiredActScore)  " +
            "                         OR (CAST(:requiredGreScore  AS INTEGER) IS NULL OR a.gre_score  >= :requiredGreScore)  " +
            "                         OR (CAST(:requiredGmatScore AS INTEGER) IS NULL OR a.gmat_score >= :requiredGmatScore)  " +
            "                          )  " +
            "                      and (  " +
            "                            (CAST(:requiredToeflScore AS INTEGER) IS NULL OR a.toefl_score >= :requiredToeflScore)  " +
            "                         OR (CAST(:requiredIeltsScore AS DOUBLE PRECISION) IS NULL OR a.ielts_score >= :requiredIeltsScore)  " +
            "                          )", nativeQuery = true)
    List<ApplicantProfileEntity> getByScholarshipFilter(String studyLevel, List<String> restrictedNationalities,
                                                        Double gpaRequirement, Integer requiredSatScore,
                                                        Integer requiredGreScore, Integer requiredActScore, Integer requiredGmatScore,
                                                        Integer requiredToeflScore, Double requiredIeltsScore);
    List<ApplicantProfileEntity> findAllByTypeAndActive(String type, Boolean active);

    List<ApplicantProfileEntity> findAllByUserIdAndTypeAndActive(String userId, String type, Boolean active);

    @Query("""
        SELECT 
            a.preferredCountry AS country,
            COUNT(a) AS total
        FROM ApplicantProfileEntity a
        WHERE a.active = true
          AND a.preferredCountry IS NOT NULL
        GROUP BY a.preferredCountry
    """)
    List<CountryCountProjection> countByCountry();

    Optional<ApplicantProfileEntity> findByUserIdAndActiveAndType(String userId, Boolean active, String type);

    @Query(value = "select SUM(ap.weight) " +
            "from profile.applicant_preference ap " +
            "where ap.applicant_id = :profileId ", nativeQuery = true)
    Double getTotalWeightByProfileId(Long profileId);

    List<ApplicantProfileEntity> findAllByUserIdAndActive(String userId, Boolean active);

}
