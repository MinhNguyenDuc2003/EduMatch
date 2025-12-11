package com.minh.report.vo.projection;

import com.minh.enumeration.report.ReportCategoryType;

public interface ReportCountByType {
    ReportCategoryType getType();
    long getCount();
}
