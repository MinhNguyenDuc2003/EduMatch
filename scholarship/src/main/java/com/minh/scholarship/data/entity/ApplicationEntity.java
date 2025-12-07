package com.minh.scholarship.data.entity;

import com.minh.scholarship.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "APPLICATION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicationEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "APPLICATION_NAME")
    private String applicationName;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "CODE")
    private String code;

    @Column(name = "VERSION_APPLICATION")
    private Long versionApplication;

    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "DATE_OF_BIRTH")
    private String dateOfBirth;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "NATIONALITY")
    private String nationality;

    @Column(name = "EDUCATION_LEVEL")
    private String educationLevel;

    @Column(name = "SCHOOL_NAME")
    private String schoolName;

    @Column(name = "MAJOR")
    private String major;

    @Column(name = "GPA")
    private Double gpa;

    @Column(name = "GRADUATION_YEAR")
    private String graduationYear;

    @Column(name = "SKILLS")
    private String skills;

    @Column(name = "LANGUAGES")
    private String languages;

    @Column(name = "ACHIEVEMENTS")
    private String achievements;

    @Column(name = "EXTRACURRICULAR")
    private String extracurricular;

    @Column(name = "MOTIVATION")
    private String motivation;

    @Column(name = "PERSONAL_STATEMENT")
    private String personalStatement;

    // ================================
    // NEW FIELDS — MATCHING FIELDS
    // ================================

    @Column(name = "CAREER_GOAL")
    private String careerGoal;

    @Column(name = "RESEARCH_INTEREST")
    private String researchInterest;

    @Column(name = "ACADEMIC_AWARDS")
    private String academicAwards;

    @Column(name = "PUBLICATION_COUNT")
    private Integer publicationCount;

    @Column(name = "SAT_SCORE")
    private Integer satScore;

    @Column(name = "ACT_SCORE")
    private Integer actScore;

    @Column(name = "GRE_SCORE")
    private Integer greScore;

    @Column(name = "GMAT_SCORE")
    private Integer gmatScore;

    @Column(name = "TOEFL_SCORE")
    private Integer toeflScore;

    @Column(name = "IELTS_SCORE")
    private Double ieltsScore;

    @Column(name = "WORK_EXPERIENCE_YEARS")
    private Integer workExperienceYears;

    @Column(name = "CLASS_RANK")
    private Integer classRank;

    @Column(name = "CLASS_SIZE")
    private Integer classSize;

    @Column(name = "CLASS_RANK_PERCENTILE")
    private Double classRankPercentile;

    @Column(name = "AGE")
    private Integer age;

    @Column(name = "CITIZENSHIP")
    private String citizenship;

    @Column(name = "IS_ATHLETE")
    private Boolean isAthlete;

    @Column(name = "ATHLETIC_ACHIEVEMENTS")
    private String athleticAchievements;

}
