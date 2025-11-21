package com.minh.scholarship.data.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationScholarshipStatusStatisticVo {
    private String status;
    private Long total;
}
