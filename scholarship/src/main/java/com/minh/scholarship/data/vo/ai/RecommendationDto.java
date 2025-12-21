package com.minh.scholarship.data.vo.ai;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class RecommendationDto implements Serializable {

    @JsonProperty("scholarship_id")
    Long scholarship;

    @JsonProperty("profile_id")
    Long applicant;

    @JsonProperty("application_id")
    Long application;

    @JsonProperty("final_score")
    Double similarityScore;

    @JsonProperty("llm_score")
    @JsonAlias({"llm"})
    private LlmResultDto llm;

    private CosineResultDto cosine;

}
