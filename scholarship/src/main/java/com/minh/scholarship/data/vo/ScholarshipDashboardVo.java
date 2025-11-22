package com.minh.scholarship.data.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class ScholarshipDashboardVo {
    private Long totalScholarship;
    private Map<String, Long> totalApplicationByStatus;
    private Long totalViews;
}

