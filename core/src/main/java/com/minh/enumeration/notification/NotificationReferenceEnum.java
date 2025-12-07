package com.minh.enumeration.notification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum NotificationReferenceEnum {

    SCHOLARSHIP("SCHOLARSHIP"),
    PROVIDER_NEWS("PROVIDER_NEWS"),
    APPLICATION("APPLICATION"),
    SCHOLARSHIP_APPLICATION("SCHOLARSHIP_APPLICATION"),
    APPLICATION_REFERRAL("APPLICATION_REFERRAL"),
    SYSTEM("SYSTEM"),
    INVALID("INVALID");

    private final String code;

    public static NotificationReferenceEnum of(String code) {
        return (StringUtils.isBlank(code))
                ? INVALID
                : Arrays.stream(NotificationReferenceEnum.values())
                .filter(z -> z.getCode().equals(code))
                .findFirst()
                .orElse(INVALID);
    }

}
