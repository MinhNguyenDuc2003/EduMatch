package com.minh.scholarship.data.vo.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LlmResultDto implements Serializable {

    @JsonProperty("motivation_score")
    private Double motivationScore;
    @JsonProperty("statement_score")
    private Double statementScore;
    @JsonProperty("career_score")
    private Double careerScore;
    @JsonProperty("achievement_score")
    private Double achievementScore;
    @JsonProperty("extracurricular_score")
    private Double extracurricularScore;
    @JsonProperty("overall_soft_score")
    private Double overallSoftScore;
    @JsonProperty("experience_score")
    private Double experienceScore;
    @JsonProperty("education_score")
    private Double educationScore;
    @JsonProperty("intentions_score")
    private Double intentionsScore;

}
