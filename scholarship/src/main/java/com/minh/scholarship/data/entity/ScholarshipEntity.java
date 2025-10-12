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

}
