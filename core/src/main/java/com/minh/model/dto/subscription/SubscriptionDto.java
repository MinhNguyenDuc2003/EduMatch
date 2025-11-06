package com.minh.model.dto.subscription;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.model.dto.BaseDto;
import com.minh.utils.serializer.DateToTimestamp;
import com.minh.utils.serializer.TimestampToDate;
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

    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime startDate;

    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime endDate;

    private String status;

    private Boolean autoRenew;

    private SubscriptionPlanDto plan;
}
