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

    @Column(name = "ACHIEVEMENTS")
    private String achievements;

    @Column(name = "EXTRACURRICULAR")
    private String extracurricular;

    @Column(name = "MOTIVATION")
    private String motivation;

    @Column(name = "PERSONAL_STATEMENT")
    private String personalStatement;

}
