package com.minh.customer.controller;

import com.minh.customer.data.vo.CustomerVo;
import com.minh.customer.service.CustomerService;
import com.minh.customer.viewmodel.customer.CustomerAdminVm;
import com.minh.customer.viewmodel.customer.CustomerListVm;
import com.minh.customer.viewmodel.customer.CustomerPostVm;
import com.minh.customer.viewmodel.customer.CustomerProfileRequestVm;
import com.minh.customer.viewmodel.customer.CustomerVm;
import com.minh.customer.viewmodel.customer.GuestUserVm;
import com.minh.model.ApiResponse;
import com.minh.utils.SecurityUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/backoffice/customers")
    public ResponseEntity<CustomerListVm> getCustomers(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo) {
        return ResponseEntity.ok(customerService.getCustomers(pageNo));
    }

    @GetMapping("/backoffice/customers/{email}")
    public ResponseEntity<CustomerAdminVm> getCustomerByEmail(@PathVariable String email) {
        return ResponseEntity.ok(customerService.getCustomerByEmail(email));
    }

    @GetMapping("/backoffice/customers/profile/{id}")
    public ApiResponse<CustomerVo> getCustomerById(@PathVariable String id) {
        return ApiResponse.ok(customerService.getCustomerProfile(id));
    }

    @PutMapping("/backoffice/customers/profile/{id}")
    public ResponseEntity<Void> updateCustomer(
            @PathVariable String id,
            @RequestBody CustomerProfileRequestVm requestVm
    ) {
        customerService.updateCustomer(id, requestVm);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/backoffice/customers/profile/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/backoffice/customers")
    public ResponseEntity<CustomerVm> createCustomer(
            @Valid @RequestBody CustomerPostVm customerPostVm,
            UriComponentsBuilder uriComponentsBuilder
    ) {
        CustomerVm customer = customerService.create(customerPostVm);
        return ResponseEntity.created(uriComponentsBuilder.replacePath("/customers/{id}")
                        .buildAndExpand(customer.id()).toUri())
                .body(customer);
    }

    @GetMapping("/storefront/customer/profile")
    public ApiResponse<CustomerVo> getCustomerProfile() {
        return ApiResponse.ok(
                customerService.getCustomerProfile(SecurityUtil.getCurrentUserId()));
    }

    @PostMapping("/storefront/customer/profile")
    public ApiResponse<CustomerVo> createCustomerProfile(@RequestBody CustomerVo customerVo) {
        return ApiResponse.ok(
                customerService.createCustomerProfile(customerVo));
    }

    @PutMapping("/storefront/customer/profile")
    public ApiResponse<CustomerVo> updateCustomerProfile(@RequestBody CustomerVo customerVo) {
        return ApiResponse.ok(
                customerService.updateCustomerProfile(customerVo));
    }

    @PostMapping("/storefront/customer/guest-user")
    public GuestUserVm createGuestUser() {
        return customerService.createGuestUser();
    }

}
