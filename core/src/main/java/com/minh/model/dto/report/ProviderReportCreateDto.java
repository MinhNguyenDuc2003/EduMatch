package com.minh.model.dto.report;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProviderReportCreateDto {
    private Long providerId;
    private String title;
    private String comment;
    private Long categoryId; // loại complaint PROVIDER
}
