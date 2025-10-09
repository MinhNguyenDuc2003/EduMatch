package com.minh.customer.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.customer.data.vo.CustomerVo;
import com.minh.customer.service.CustomerService;
import com.minh.customer.viewmodel.customer.*;
import com.minh.model.ApiResponse;
import com.minh.utils.SecurityUtil;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @PostMapping(
            value = "/storefront/provider/profile",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}
    )
    public ApiResponse<CustomerVo> createProviderProfile(@RequestPart("profile") String profile,
                                                         @RequestPart(value = "logo", required = false) MultipartFile logo,
                                                         @RequestPart(value = "banner", required = false) MultipartFile banner) throws JsonProcessingException {
        CustomerVo customerVo = new ObjectMapper().readValue(profile, CustomerVo.class);
        return ApiResponse.ok(
                customerService.createProviderProfile(customerVo, logo, banner));
    }

    @PutMapping(value = "/storefront/provider/profile",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResponse<CustomerVo> updateProviderProfile(@RequestPart("profile") String profile,
                                                         @RequestPart(value = "logo", required = false) MultipartFile logo,
                                                         @RequestPart(value = "banner", required = false) MultipartFile banner) throws JsonProcessingException {
        CustomerVo customerVo = new ObjectMapper().readValue(profile, CustomerVo.class);
        return ApiResponse.ok(
                customerService.updateProviderProfile(customerVo, logo, banner));
    }

    @GetMapping("/storefront/provider/profile")
    public ApiResponse<CustomerVo> getProviderProfile() {
        return ApiResponse.ok(
                customerService.getProviderProfile());
    }

}
