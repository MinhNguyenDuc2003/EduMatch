package com.minh.model.dto.ai;

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

    @JsonProperty("scholarship")
    Long scholarship;

    @JsonProperty("applicant")
    Long applicant;

    @JsonProperty("application")
    Long application;

    @JsonProperty("similarity_score")
    Double similarityScore;

}
