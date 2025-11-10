package com.minh.scholarship.data.vo.projection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface ApplicationProjection {

    Long getId();

    String getUserId();

    String getFullName();

    String getGender();

    String getDateOfBirth();

    String getEmail();

    String getPhone();

    String getAddress();

    String getNationality();

    String getEducationLevel();

    String getSchoolName();

    String getMajor();

    Double getGpa();

    String getGraduationYear();

    String getSkills();

    String getLanguages();

    String getAchievements();

    String getExtracurricular();

    String getMotivation();

    String getPersonalStatement();

}
