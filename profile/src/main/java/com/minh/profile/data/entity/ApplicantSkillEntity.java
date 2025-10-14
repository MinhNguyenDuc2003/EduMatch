package com.minh.profile.data.entity;

import com.minh.profile.data.entity.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(schema = "profile", name = "APPLICANT_SKILL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicantSkillEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "APPLICANT_ID")
    private Long applicantId;

    @Column(length = 225, name = "SKILL_NAME")
    private String skillName;

    @Column(length = 100, name = "PROFICIENCY_LEVEL")
    private String proficiencyLevel;

    @Column(precision = 4, scale = 2, name = "YEARS_EXPERIENCE")
    private BigDecimal yearsExperience;

}
