package com.minh.model.dto.report;

import lombok.Data;

@Data
public class ScholarshipReportCreateDto {
    private Long categoryId;
    private String title;
    private String comment;
    private Long scholarshipId; // id của scholarship
}
