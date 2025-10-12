package com.minh.model.dto.scholarship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class ScholarshipDto extends BaseDto {

    private Long id;

    private String title;

    private String slug;

    private String shortDescription;

    private String description;

    private String requirements;

    private String benefits;

    private String fields;

    private String country;

    private String university;

    private String studyLevel;

    private String scholarshipType;

    private String fundingAmount;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private int availableSlots;

    private String languageRequirement;

    private Double gpaRequirement;

}
