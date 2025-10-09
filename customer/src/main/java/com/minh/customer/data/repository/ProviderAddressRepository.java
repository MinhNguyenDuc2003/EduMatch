package com.minh.customer.data.repository;

import com.minh.customer.data.entity.ProviderAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProviderAddressRepository extends JpaRepository<ProviderAddress, Long> {
    List<ProviderAddress> findAllByProviderId(Long providerId);

    ProviderAddress findOneByProviderIdAndAddressId(Long providerId, Long id);

    Optional<ProviderAddress> findByProviderIdAndIsActiveTrue(Long providerId);
}
