package com.minh.customer.viewmodel.useraddress;

import com.minh.customer.data.entity.ProviderAddress;
import com.minh.customer.viewmodel.address.AddressVm;
import lombok.Builder;

@Builder
public record ProviderAddressVm(
        Long id,
        Long providerId,
        AddressVm addressGetVm,
        Boolean isActive) {
    public static ProviderAddressVm fromModel(ProviderAddress providerAddress, AddressVm addressGetVm) {
        return ProviderAddressVm.builder()
                .id(providerAddress.getId())
                .providerId(providerAddress.getProviderId())
                .addressGetVm(addressGetVm)
                .isActive(providerAddress.getIsActive())
                .build();
    }
}
