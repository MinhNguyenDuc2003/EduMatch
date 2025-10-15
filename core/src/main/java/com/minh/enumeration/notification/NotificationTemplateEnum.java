package com.minh.enumeration.notification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum NotificationTemplateEnum {

    SCHOLARSHIP_NEW("SCHOLARSHIP_NEW"),
    SCHOLARSHIP_UPDATED("SCHOLARSHIP_UPDATED"),
    SCHOLARSHIP_NEWS("SCHOLARSHIP_NEWS"),
    INVALID("INVALID");

    private final String code;

    public static NotificationTemplateEnum of(String code) {
        return (StringUtils.isBlank(code))
                ? INVALID
                : Arrays.stream(NotificationTemplateEnum.values())
                .filter(z -> z.getCode().equals(code))
                .findFirst()
                .orElse(INVALID);
    }

}
