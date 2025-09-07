package com.minh.location.data.repository;

import com.minh.location.data.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByIdIn(List<Long> ids);
}
