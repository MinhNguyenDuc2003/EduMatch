package com.minh.model.dto.subscription;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RevenueByUserTypeDto {
    private SubscriptionTargetType userType;
    private Double total;
}
