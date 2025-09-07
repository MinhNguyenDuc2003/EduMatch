package com.minh.customer.controller;

import com.minh.customer.service.UserAddressService;
import com.minh.customer.viewmodel.address.ActiveAddressVm;
import com.minh.customer.viewmodel.address.AddressDetailVm;
import com.minh.customer.viewmodel.address.AddressPostVm;
import com.minh.customer.viewmodel.useraddress.UserAddressVm;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserAddressController {

    private final UserAddressService userAddressService;

    @GetMapping("/storefront/user-address")
    public ResponseEntity<List<ActiveAddressVm>> getUserAddresses() {
        return ResponseEntity.ok(userAddressService.getUserAddressList());
    }

    @GetMapping("/storefront/user-address/default-address")
    public ResponseEntity<AddressDetailVm> getDefaultAddress() {
        return ResponseEntity.ok(userAddressService.getAddressDefault());
    }

    @PostMapping("/storefront/user-address")
    public ResponseEntity<UserAddressVm> createAddress(@Valid @RequestBody AddressPostVm addressPostVm) {
        return ResponseEntity.ok(userAddressService.createAddress(addressPostVm));
    }

    @DeleteMapping("/storefront/user-address/{id}")
    public ResponseEntity deleteAddress(@PathVariable Long id) {
        userAddressService.deleteAddress(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/storefront/user-address/{id}")
    public ResponseEntity chooseDefaultAddress(@PathVariable Long id) {
        userAddressService.chooseDefaultAddress(id);
        return ResponseEntity.ok().build();
    }
}
