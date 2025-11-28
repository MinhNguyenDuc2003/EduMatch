package com.minh.model.dto.scholarship;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScholarshipStatisticsDto {
    private Long totalScholarships;
    private Long totalViews;
    private Long totalApplies;
    private Double averageApplyRate;
    private Double approveRate;
    private Double rejectRate;
    private Double pendingRate;
    private Double viewButNoApplyRate;
    private List<String> top5ByView;
    private List<String> top5ByApply;
}
