package com.minh.profile.data.repository;

import com.minh.profile.data.entity.junction.ProviderMediaEntity;
import com.minh.profile.data.entity.junction.id.ProviderMediaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderMediaRepository extends JpaRepository<ProviderMediaEntity, ProviderMediaId> {

    void deleteByProviderIdAndImageType(Long id, String logo);

}
