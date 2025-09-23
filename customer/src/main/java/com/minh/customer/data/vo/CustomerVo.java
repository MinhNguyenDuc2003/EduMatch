package com.minh.customer.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.customer.viewmodel.address.ActiveAddressVm;
import com.minh.customer.viewmodel.address.AddressPostVm;
import com.minh.customer.viewmodel.customer.CustomerVm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerVo {

    private CustomerVm customer;
    private ApplicantProfileVo applicantProfile;
    private List<ActiveAddressVm> addresses = new ArrayList<>();
    private AddressPostVm addressPostVm;

}
