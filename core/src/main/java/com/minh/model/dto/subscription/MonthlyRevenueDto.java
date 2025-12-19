package com.minh.model.dto.subscription;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.YearMonth;

@Getter
@Setter
@AllArgsConstructor
public class MonthlyRevenueDto {
    private Integer year;
    private Integer month;
    private Double total;
    private Long count;
}
