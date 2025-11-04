package com.minh.model.dto.scholarship;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.model.dto.BaseDto;
import com.minh.utils.serializer.DateToTimestamp;
import com.minh.utils.serializer.TimestampToDate;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class ApplicationScholarshipDto extends BaseDto {

    private Long id;

    private Long applicationId;

    private Long scholarshipId;

    private String status;

    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private String appliedAt;

    private String reviewedId;

    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private String reviewedAt;

    private String note;
}
