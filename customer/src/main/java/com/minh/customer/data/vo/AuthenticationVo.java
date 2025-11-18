package com.minh.customer.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.customer.viewmodel.customer.CustomerVm;
import com.minh.model.dto.subscription.SubscriptionDto;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationVo implements Serializable {

    private static final long serialVersionUID = 1L;

    private CustomerVm customer;
    private Boolean isAuthenticated;
    private Boolean isProvider;
    private List<SubscriptionDto> subscriptions;

}
