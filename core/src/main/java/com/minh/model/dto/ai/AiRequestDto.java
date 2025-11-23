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
public class AiRequestDto implements Serializable {

    @JsonProperty("applicant_id")
    Long applicantId;

    @JsonProperty("scholarship_id")
    Long scholarshipId;

    @JsonProperty("top_k")
    Integer topK;

}
