package com.minh.location.service;

import com.minh.exception.BusinessException;
import com.minh.location.data.entity.Address;
import com.minh.location.data.entity.Country;
import com.minh.location.data.repository.AddressRepository;
import com.minh.location.data.repository.CountryRepository;
import com.minh.location.data.repository.DistrictRepository;
import com.minh.location.data.repository.StateOrProvinceRepository;
import com.minh.location.viewmodel.address.AddressDetailVm;
import com.minh.location.viewmodel.address.AddressGetVm;
import com.minh.location.viewmodel.address.AddressPostVm;
import com.minh.model.ApiMessageCore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final StateOrProvinceRepository stateOrProvinceRepository;
    private final CountryRepository countryRepository;
    private final DistrictRepository districtRepository;

    public AddressGetVm createAddress(AddressPostVm dto) {
        Address address = AddressPostVm.fromModel(dto);
        stateOrProvinceRepository.findById(dto.stateOrProvinceId()).ifPresent(address::setStateOrProvince);
        Country country = countryRepository.findById(dto.countryId())
                .orElseThrow(() -> new BusinessException(ApiMessageCore.COUNTRY_NOT_FOUND));
        address.setCountry(country);
        districtRepository.findById(dto.districtId()).ifPresent(address::setDistrict);
        return AddressGetVm.fromModel(addressRepository.save(address));
    }

    public void updateAddress(Long id, AddressPostVm dto) {
        Address address = addressRepository.findById(id).orElseThrow(() ->
                new BusinessException(ApiMessageCore.ADDRESS_NOT_FOUND));

        address.setContactName(dto.contactName());
        address.setAddressLine1(dto.addressLine1());
        address.setAddressLine2(dto.addressLine2());
        address.setPhone(dto.phone());
        address.setCity(dto.city());
        address.setZipCode(dto.zipCode());

        stateOrProvinceRepository.findById(dto.stateOrProvinceId()).ifPresent(address::setStateOrProvince);
        countryRepository.findById(dto.countryId()).ifPresent(address::setCountry);
        districtRepository.findById(dto.districtId()).ifPresent(address::setDistrict);
        addressRepository.save(address);
    }

    public List<AddressDetailVm> getAddressList(List<Long> ids) {
        List<Address> addressList = addressRepository.findAllByIdIn(ids);
        return addressList.stream().map(AddressDetailVm::fromModel).toList();
    }

    public AddressDetailVm getAddress(Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() ->
                new BusinessException(ApiMessageCore.ADDRESS_NOT_FOUND));
        return AddressDetailVm.fromModel(address);
    }

    public void deleteAddress(Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() ->
                new BusinessException(ApiMessageCore.ADDRESS_NOT_FOUND));
        addressRepository.delete(address);
    }
}
