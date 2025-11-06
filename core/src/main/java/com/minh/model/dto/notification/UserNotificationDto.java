package com.minh.model.dto.notification;

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

}
