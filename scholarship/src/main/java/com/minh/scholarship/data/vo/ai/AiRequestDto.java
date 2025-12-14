package com.minh.scholarship.data.vo.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.data.vo.ApplicantProfileVo;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class AiRequestDto implements Serializable {

    private ApplicantProfileVo application;

    private ApplicantProfileVo profile;

    private ScholarshipDto scholarship;

    @JsonProperty("top_k")
    Integer topK;

    private List<ScholarshipDto> scholarships;

}
