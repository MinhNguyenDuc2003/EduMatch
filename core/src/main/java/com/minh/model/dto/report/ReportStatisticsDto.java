package com.minh.model.dto.report;

import com.minh.enumeration.report.ReportCategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportStatisticsDto {
    private ReportCategoryType type;
    private long thisMonthCount;
    private long lastMonthCount;
}
