package com.minh.enumeration.notification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum NotificationTopicEnum {

    PROVIDER_FOLLOWER("PROVIDER_FOLLOWER"),
    SCHOLARSHIP_FOLLOWER("SCHOLARSHIP_FOLLOWER"),
    APPLICATION_SUBMITTED("APPLICATION_SUBMITTED"),
    SCHOLARSHIP_APPLICATION("SCHOLARSHIP_APPLICATION"),
    APPLICATION_REFERRAL("APPLICATION_REFERRAL"),
    INVALID("INVALID");

    private final String code;

    public static NotificationTopicEnum of(String code) {
        return (StringUtils.isBlank(code))
                ? INVALID
                : Arrays.stream(NotificationTopicEnum.values())
                .filter(z -> z.getCode().equals(code))
                .findFirst()
                .orElse(INVALID);
    }

}
