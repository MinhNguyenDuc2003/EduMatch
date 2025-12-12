package com.minh.scholarship.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.scholarship.ScholarshipDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScholarshipRecommendationVo implements Serializable {

    private static final long serialVersionUID = 1L;

    private Map<String, Double> applicantPreference;
    private List<ScholarshipDto> scholarships;
    private ApplicantProfileVo profile;

}
