package com.minh.model.dto.subscription;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;
import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class SubscriptionDto extends BaseDto {

    private Long id;

    private String userId;

    private String userType;

    private Long planId;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String status;

    private Boolean autoRenew;
}
