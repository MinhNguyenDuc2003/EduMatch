package com.minh.scholarship.data.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScholarshipApplyStatisticVo {
    private Long scholarshipId;
    private String scholarshipTitle;
    private Long totalApply;

}
