package com.minh.location.data.repository;

import com.minh.location.data.entity.District;
import com.minh.location.viewmodel.district.DistrictGetVm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Long> {
    List<DistrictGetVm> findAllByStateProvinceIdOrderByNameAsc(Long stateProvinceId);
}
