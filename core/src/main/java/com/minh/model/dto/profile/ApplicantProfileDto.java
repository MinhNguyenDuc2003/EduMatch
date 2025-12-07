package com.minh.model.dto.profile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class ApplicantProfileDto extends BaseDto {

    private Long id;
    private String userId;
    private String contactName;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String religion;
    private String hometown;
    private String citizenshipStatus;
    private String ethnicity;
    private String race;
    private Boolean militaryFamilyHistory;
    private String disabilities;
    private String medicalConditions;
    private String favoriteActivities;
    private String sportsParticipated;
    private String studentActivities;
    private String organizationsJoined;
    private String researchExperience;
    private String careerGoals;
    private BigDecimal overallGpa;

    // ==============================
    // NEW FIELDS
    // ==============================

    private String educationLevel;

    private Integer satScore;
    private Integer actScore;
    private Integer toeflScore;
    private Double ieltsScore;
    private Integer greScore;
    private Integer gmatScore;

    private String languages;

    private String academicAwards;
    private Integer publicationCount;
    private String researchInterest;

    private String extracurricularActivities;

    private String preferredScholarshipType;
    private String preferredCountry;
    private String preferredUniversity;

}
