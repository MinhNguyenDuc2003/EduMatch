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

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(schema = "profile", name = "APPLICANT_EDUCATION_HISTORY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicantEducationHistoryEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "APPLICANT_ID")
    private Long applicantId;

    @Column(length = 200, name = "INSTITUTION_NAME")
    private String institutionName;

    @Column(length = 50, name = "INSTITUTION_TYPE")
    private String institutionType;

    @Column(length = 100, name = "STATE")
    private String state;

    @Column(length = 100, name = "COUNTRY")
    private String country;

    @Column(length = 50, name = "DEGREE_TYPE")
    private String degreeType;

    @Column(length = 150, name = "MAJOR_CATEGORY")
    private String majorCategory;

    @Column(length = 150, name = "MAJOR_NAME")
    private String majorName;

    @Column(precision = 3, scale = 2, name = "GPA")
    private BigDecimal gpa;

    @Column(length = 50, name = "CLASS_RANK")
    private String classRank;

    @Column(name = "CLASS_SIZE")
    private Integer classSize;

    @Column(name = "ENROLLMENT_START_DATE")
    private LocalDateTime enrollmentStartDate;

    @Column(name = "ENROLLMENT_END_DATE")
    private LocalDateTime enrollmentEndDate;

    @Column(name = "GRADUATION_YEAR")
    private Integer graduationYear;

    @Column(name = "IS_DUAL_ENROLLED")
    private Boolean isDualEnrolled;

    @Column(name = "IS_TRANSFER")
    private Boolean isTransfer;

    @Column(name = "IS_RETURNING_STUDENT")
    private Boolean isReturningStudent;

    @Lob
    @Column(name = "NOTES")
    private String notes;

}
