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

@Entity
@Table(schema = "profile", name = "APPLICANT_PROFILE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicantProfileEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(length = 450, name = "CONTACT_NAME")
    private String contactName;

    @Column(length = 100, name = "FIRST_NAME")
    private String firstName;

    @Column(length = 100, name = "LAST_NAME")
    private String lastName;

    @Column(length = 100, name = "RELIGION")
    private String religion;

    @Column(length = 150, name = "HOMETOWN")
    private String hometown;

    @Column(length = 100, name = "CITIZENSHIP_STATUS")
    private String citizenshipStatus;

    @Column(length = 100, name = "ETHNICITY")
    private String ethnicity;

    @Column(length = 100, name = "RACE")
    private String race;

    @Column(name = "MILITARY_FAMILY_HISTORY")
    private Boolean militaryFamilyHistory;

    @Column(length = 255, name = "DISABILITIES")
    private String disabilities;

    @Column(length = 255, name = "MEDICAL_CONDITIONS")
    private String medicalConditions;

    @Lob
    @Column(name = "FAVORITE_ACTIVITIES")
    private String favoriteActivities;

    @Lob
    @Column(name = "SPORTS_PARTICIPATED")
    private String sportsParticipated;

    @Lob
    @Column(name = "STUDENT_ACTIVITIES")
    private String studentActivities;

    @Lob
    @Column(name = "ORGANIZATIONS_JOINED")
    private String organizationsJoined;

    @Lob
    @Column(name = "RESEARCH_EXPERIENCE")
    private String researchExperience;

    @Lob
    @Column(name = "CAREER_GOALS")
    private String careerGoals;

    @Column(precision = 3, scale = 2, name = "OVERALL_GPA")
    private BigDecimal overallGpa;

}