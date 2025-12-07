package com.minh.model.dto.scholarship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.model.dto.BaseDto;
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
public class ApplicationDto extends BaseDto {

    private Long id;

    private String applicationName;

    private String code;

    private Long versionApplication;

    private String userId;

    private String fullName;

    private String gender;

    private String dateOfBirth;

    private String email;

    private String phone;

    private String address;

    private String nationality;

    private String educationLevel;

    private String schoolName;

    private String major;

    private Double gpa;

    private String graduationYear;

    private String skills;

    private String languages;

    private String achievements;

    private String extracurricular;

    private String motivation;

    private String personalStatement;

    // ======================================
    // NEW MATCHING FIELDS — DTO NEW FIELDS
    // ======================================

    private String careerGoal;

    private String researchInterest;

    private String academicAwards;

    private Integer publicationCount;

    private Integer satScore;

    private Integer actScore;

    private Integer greScore;

    private Integer gmatScore;

    private Integer toeflScore;

    private Double ieltsScore;

    private Integer workExperienceYears;

    private Integer classRank;

    private Integer classSize;

    private Double classRankPercentile;

    private Integer age;

    private String citizenship;

    private Boolean isAthlete;

    private String athleticAchievements;

    @JsonProperty("createdDate")
    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime createdDate;

}
