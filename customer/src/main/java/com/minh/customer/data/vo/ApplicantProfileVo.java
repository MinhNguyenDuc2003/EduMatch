package com.minh.customer.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.profile.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicantProfileVo extends ApplicantProfileDto {

    private List<ApplicantCertificateDto> certificates = new ArrayList<>();
    private List<ApplicantEducationHistoryDto> educationHistories = new ArrayList<>();
    private List<ApplicantPreferenceDto> applicantPreferences = new ArrayList<>();
    private List<ApplicantSkillDto> skills = new ArrayList<>();
    private List<ApplicantEducationIntentionDto> intentions = new ArrayList<>();

}
