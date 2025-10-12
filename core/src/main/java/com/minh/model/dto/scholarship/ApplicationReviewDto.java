package com.minh.model.dto.scholarship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class ApplicationReviewDto extends BaseDto {

    private Long id;

    private Long applicationId;

    private String reviewId;

    private String score;

    private String comment;

    private String reviewedAt;

}
