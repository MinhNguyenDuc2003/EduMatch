package com.minh.scholarship.data.entity;

import com.minh.scholarship.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(schema = "scholarship", name = "SCHOLARSHIP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ScholarshipEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PROVIDER_ID")
    private Long providerId;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "SLUG")
    private String slug;

    @Column(name = "SHORT_DESCRIPTION")
    private String shortDescription;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "REQUIREMENTS")
    private String requirements;

    @Column(name = "BENEFITS")
    private String benefits;

    @Column(name = "FIELDS")
    private String fields;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "UNIVERSITY")
    private String university;

    @Column(name = "STUDY_LEVEL")
    private String studyLevel;

    @Column(name = "SCHOLARSHIP_TYPE")
    private String scholarshipType;

    @Column(name = "FUNDING_AMOUNT")
    private String fundingAmount;

    @Column(name = "START_DATE")
    private LocalDateTime startDate;

    @Column(name = "END_DATE")
    private LocalDateTime endDate;

    @Column(name = "AVAILABLE_SLOTS")
    private int availableSlots;

    @Column(name = "LANGUAGE_REQUIREMENT")
    private String languageRequirement;

    @Column(name = "GPA_REQUIREMENT")
    private Double gpaRequirement;

    // ==============================
    // NEW FIELDS
    // ==============================

    @Column(name = "REQUIRED_MAJOR")
    private String requiredMajor;

    @Column(name = "RESTRICTED_NATIONALITIES")
    private String restrictedNationalities;

    @Column(name = "MIN_AGE")
    private Integer minAge;

    @Column(name = "MAX_AGE")
    private Integer maxAge;

    @Column(name = "GENDER_REQUIREMENT")
    private String genderRequirement;

    @Column(name = "REQUIRED_SAT_SCORE")
    private Integer requiredSatScore;

    @Column(name = "REQUIRED_ACT_SCORE")
    private Integer requiredActScore;

    @Column(name = "REQUIRED_GRE_SCORE")
    private Integer requiredGreScore;

    @Column(name = "REQUIRED_GMAT_SCORE")
    private Integer requiredGmatScore;

    @Column(name = "REQUIRED_TOEFL_SCORE")
    private Integer requiredToeflScore;

    @Column(name = "REQUIRED_IELTS_SCORE")
    private Double requiredIeltsScore;

    @Column(name = "REQUIRED_WORK_EXPERIENCE_YEARS")
    private Integer requiredWorkExperienceYears;

    @Column(name = "REQUIRED_PUBLICATION_COUNT")
    private Integer requiredPublicationCount;

    @Column(name = "REQUIRED_ACADEMIC_AWARDS")
    private String requiredAcademicAwards;

    @Column(name = "REQUIRED_CLASS_RANK_PERCENTILE")
    private Integer requiredClassRankPercentile;

    @Column(name = "STATUS")
    private String status;

}
