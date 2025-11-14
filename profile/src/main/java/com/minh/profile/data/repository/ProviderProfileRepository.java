package com.minh.profile.data.repository;

import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.vo.projection.ProviderProfileProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProviderProfileRepository extends JpaRepository<ProviderProfileEntity, Long> {

    Optional<ProviderProfileEntity> findByUserId(String userId);

    List<ProviderProfileEntity> findByVerifiedFalse();

    @Query(value = "SELECT p.id, " +
            " p.USER_ID as userId, " +
            " p.ORGANIZATION_NAME as organizationName, " +
            " p.ORGANIZATION_TYPE as organizationType, " +
            " p.WEBSITE as website, " +
            " p.EMAIL as email, " +
            " p.PHONE as phone, " +
            " p.ADDRESS_SUMMARY as addressSummary, " +
            " p.DESCRIPTION as description, " +
            " p.YEAR_ESTABLISHED as yearEstablished, " +
            " p.ACCREDITATION as accreditation, " +
            " p.SPECIALIZATION as specialization, " +
            " p.VERIFIED as verified, " +
            " p.COUNTRY as country, " +
            " case when f.user_id is not null then 1 end as isFollow " +
            " FROM profile.PROVIDER_PROFILE p " +
            " LEFT JOIN profile.PROVIDER_FOLLOWER f ON f.provider_id = p.id AND f.user_id = :userId " +
            " WHERE p.id = :id ", nativeQuery = true)
    Optional<ProviderProfileProjection> getDetail(Long id, String userId);
}
