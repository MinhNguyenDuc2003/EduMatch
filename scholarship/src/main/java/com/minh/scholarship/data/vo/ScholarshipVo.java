package com.minh.scholarship.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.scholarship.ApplicationAttributeDto;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.model.dto.scholarship.ScholarshipPreferenceDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScholarshipVo extends ScholarshipDto {

    private ProviderProfileVo providerProfileVo;
    private List<ScholarshipPreferenceDto> scholarshipPreferences;
    private List<MediaDto> scholarshipMedias;
    private List<ApplicationAttributeDto> applicationAttributes;
    private int isFollow;
    private int views;
    private Double score;

}
