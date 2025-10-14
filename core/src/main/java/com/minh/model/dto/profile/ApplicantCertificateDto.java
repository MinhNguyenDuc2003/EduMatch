package com.minh.model.dto.profile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.model.dto.BaseDto;
import com.minh.utils.serializer.DateToTimestamp;
import com.minh.utils.serializer.TimestampToDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class ApplicantCertificateDto extends BaseDto {

    private Long id;
    private Long applicantId;
    private String certificateName;
    private String issuedBy;

    @JsonDeserialize(using = TimestampToDate.class)
    @JsonSerialize(using = DateToTimestamp.class)
    private LocalDateTime issueDate;
    @JsonDeserialize(using = TimestampToDate.class)
    @JsonSerialize(using = DateToTimestamp.class)
    private LocalDateTime expiryDate;

    private String score;

}
