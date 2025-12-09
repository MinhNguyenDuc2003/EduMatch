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

    @Query(value =
            "select a.* " +
                    "from scholarship.application a " +
                    "inner join scholarship.application_scholarship asch " +
                    "    on a.id = asch.application_id " +
                    "where asch.scholarship_id = :scholarshipId " +
                    "  and a.active = true " +
//                    "  AND ( " +
//                    "      :restrictedNationalities IS NULL " +
//                    "   OR cardinality(CAST(:restrictedNationalities AS text[])) = 0 " +
//                    "   OR a.nationality = ANY(CAST(:restrictedNationalities AS text[])) " +
//                    ")" +
                    "  and (:studyLevel is null or a.education_level = :studyLevel) " +
                    "  and (:minAge is null or a.age >= :minAge) " +
                    "  and (:maxAge is null or a.age <= :maxAge) " +
                    "  and (:genderRequirement is null " +
                    "       or :genderRequirement = 'Any' " +
                    "       or a.gender = :genderRequirement) " +
                    "  and (:gpaRequirement is null or a.gpa >= :gpaRequirement) " +
                    "  and ( " +
                    "        (:requiredSatScore  IS NULL OR a.sat_score  >= :requiredSatScore) " +
                    "     OR (:requiredActScore  IS NULL OR a.act_score  >= :requiredActScore) " +
                    "     OR (:requiredGreScore  IS NULL OR a.gre_score  >= :requiredGreScore) " +
                    "     OR (:requiredGmatScore IS NULL OR a.gmat_score >= :requiredGmatScore) " +
                    "      ) " +
                    "  and ( " +
                    "        (:requiredToeflScore IS NULL OR a.toefl_score >= :requiredToeflScore) " +
                    "     OR (:requiredIeltsScore IS NULL OR a.ielts_score >= :requiredIeltsScore) " +
                    "      ) " +

                    "  and (:requiredWorkExperienceYears is null " +
                    "       or a.work_experience_years >= :requiredWorkExperienceYears) " +

                    "  and (:requiredPublicationCount is null " +
                    "       or a.publication_count >= :requiredPublicationCount) "
            , nativeQuery = true)
    List<ApplicationEntity> findAllByFilter(
            Long scholarshipId,
            String studyLevel,
            Integer minAge,
            Integer maxAge,
            String genderRequirement,
            Double gpaRequirement,
            Integer requiredSatScore,
            Integer requiredGreScore,
            Integer requiredGmatScore,
            Integer requiredActScore,
            Integer requiredToeflScore,
            Double requiredIeltsScore,
            Integer requiredWorkExperienceYears,
            Integer requiredPublicationCount
    );

}
