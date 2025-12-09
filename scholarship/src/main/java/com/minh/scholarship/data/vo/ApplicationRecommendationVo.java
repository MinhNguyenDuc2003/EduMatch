package com.minh.scholarship.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.scholarship.data.entity.ApplicationEntity;
import com.minh.scholarship.data.entity.ScholarshipEntity;
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
public class ApplicationRecommendationVo implements Serializable {

    private static final long serialVersionUID = 1L;

    private Map<String, Double> scholarshipPreference;
    private List<ApplicationEntity> applications;
    private ScholarshipEntity scholarship;

}
