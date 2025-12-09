package com.minh.subscription.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.subscription.PaymentDto;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVo extends PaymentDto {

    private SubscriptionVo subscription;
    private CustomerVm customer;

}
