package com.minh.profile.data.entity;

import com.minh.profile.data.entity.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(schema = "profile", name = "APPLICANT_INTENTION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicantEducationIntentionEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "APPLICANT_ID")
    private Long applicantId;

    @Column(length = 200, name = "INTENDED_INSTITUTION")
    private String intendedInstitution;

    @Column(length = 100, name = "INTENDED_STATE")
    private String intendedState;

    @Column(length = 100, name = "INTENDED_COUNTRY")
    private String intendedCountry;

    @Column(length = 50, name = "DEGREE_TYPE")
    private String degreeType;

    @Column(length = 150, name = "INTENDED_MAJOR_CATEGORY")
    private String intendedMajorCategory;

    @Column(length = 150, name = "INTENDED_MAJOR_NAME")
    private String intendedMajorName;

    @Column(length = 50, name = "ACADEMIC_CLASSIFICATION")
    private String academicClassification;

    @Column(name = "EXPECTED_START_DATE")
    private LocalDateTime expectedStartDate;

    @Column(name = "EXPECTED_GRADUATION_YEAR")
    private Integer expectedGraduationYear;

    @Column(name = "IS_TRANSFER_STUDENT", nullable = false)
    private Boolean isTransferStudent = false;

    @Column(name = "IS_RETURNING_STUDENT", nullable = false)
    private Boolean isReturningStudent = false;

    @Lob
    @Column(name = "NOTES")
    private String notes;

}
