package com.minh.profile.data.repository;

import com.minh.profile.data.entity.junction.ProviderNewsMediaEntity;
import com.minh.profile.data.entity.junction.id.ProviderNewsMediaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderNewsMediaRepository extends JpaRepository<ProviderNewsMediaEntity, ProviderNewsMediaId> {
    List<ProviderNewsMediaEntity> findAllByProviderNewsId(Long providerNewsId);

    void deleteAllByProviderNewsId(Long providerNewsId);

    void deleteByProviderNewsIdAndMediaId(Long id, Long mediaId);
    
}
