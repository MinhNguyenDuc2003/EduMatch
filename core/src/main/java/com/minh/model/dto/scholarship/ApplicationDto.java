package com.minh.model.dto.scholarship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;

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

}
