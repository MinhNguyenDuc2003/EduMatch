package com.minh.model.dto.notification;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.minh.model.dto.BaseDto;
import com.minh.utils.serializer.DateToTimestamp;
import com.minh.utils.serializer.TimestampToDate;
import lombok.*;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
@Builder
public class UserNotificationDto extends BaseDto {

    private Long id;

    private Long notificationId;

    private String userId;

    private String scholarshipId;

    private Boolean isRead;

    private String referenceType;

    private Long referenceId;

    private String content;

    private String slug;

    private Boolean isAdmin;

    @JsonProperty("createdDate")
    @JsonSerialize(using = DateToTimestamp.class)
    @JsonDeserialize(using = TimestampToDate.class)
    private LocalDateTime createdDate;

}
