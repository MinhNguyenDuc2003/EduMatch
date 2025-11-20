package com.minh.model.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.enumeration.report.ReportCategoryType;
import com.minh.enumeration.report.ReportStatus;
import com.minh.model.dto.BaseDto;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class ReportDto extends BaseDto {

    private Long id;
    private String title;
    private String comment;
    private String userId;
    private ReportCategoryDto category;
    private Boolean isRead;
    private ReportStatus status;
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private String response;
}
