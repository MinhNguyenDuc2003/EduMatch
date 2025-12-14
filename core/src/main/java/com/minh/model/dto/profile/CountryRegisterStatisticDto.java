package com.minh.model.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CountryRegisterStatisticDto {
    private String country;
    private Long total;
}
