package com.minh.model.dto.profile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.minh.model.dto.BaseDto;
import com.minh.utils.serializer.DateToTimestamp;
import com.minh.utils.serializer.TimestampToDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class ApplicantEducationHistoryDto extends BaseDto {

    private Long id;
    private Long applicantId;
    private String institutionName;
    private String institutionType;
    private String state;
    private String country;
    private String degreeType;
    private String majorCategory;
    private String majorName;
    private BigDecimal gpa;
    private String classRank;
    private Integer classSize;

    @JsonDeserialize(using = TimestampToDate.class)
    @JsonSerialize(using = DateToTimestamp.class)
    private LocalDateTime enrollmentStartDate;

    @JsonDeserialize(using = TimestampToDate.class)
    @JsonSerialize(using = DateToTimestamp.class)
    private LocalDateTime enrollmentEndDate;

    private Integer graduationYear;
    private Boolean isDualEnrolled;
    private Boolean isTransfer;
    private Boolean isReturningStudent;
    private String notes;

}
