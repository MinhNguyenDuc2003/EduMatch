package com.minh.model.dto.scholarship;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.model.dto.BaseDto;
import com.minh.utils.StringUtil;
import com.minh.utils.serializer.DateToTimestamp;
import com.minh.utils.serializer.TimestampToDate;
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

    private Long providerId;

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

    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime startDate;

    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime endDate;

    private int availableSlots;

    private String languageRequirement;

    private Double gpaRequirement;

    private Boolean isDeleted;

    // ==============================
    // NEW FIELDS
    // ==============================

    private String requiredMajor;

    private String restrictedNationalities;

    private Integer minAge;

    private Integer maxAge;

    private String genderRequirement;

    private Integer requiredSatScore;

    private Integer requiredActScore;

    private Integer requiredGreScore;

    private Integer requiredGmatScore;

    private Integer requiredToeflScore;

    private Double requiredIeltsScore;

    private Integer requiredWorkExperienceYears;

    private Integer requiredPublicationCount;

    private String requiredAcademicAwards;

    private Integer requiredClassRankPercentile;

    private String status;

    @JsonProperty("createdDate")
    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime createdDate;

    @JsonIgnore
    public void beautify() {
        this.university = StringUtil.normalize(this.university);
        this.country = StringUtil.normalize(this.country);
        this.scholarshipType = StringUtil.normalize(this.scholarshipType);
        this.studyLevel = StringUtil.normalize(this.studyLevel);

    }

}
