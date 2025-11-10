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
public class OrderDto extends BaseDto {

    private Long id;

    private Long subscriptionId;

    private String userId;

    private Double amount;

    private String currency;

    private String paymentMethod;

    private String transactionId;

    private String status;

    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime paidAt;
}
