package com.minh.subscription.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.model.dto.subscription.SubscriptionDto;
import com.minh.utils.serializer.DateToTimestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionVo extends SubscriptionDto {
    private CustomerVm customer;

    private ApplicantProfileVo applicantProfile;
    private ProviderProfileVo providerProfile;
}
