package com.minh.model.dto.report;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileReportCreateDto {
    private String title;
    private String comment;
    private Long profileId; // id của profile
    private Long categoryId;
}
