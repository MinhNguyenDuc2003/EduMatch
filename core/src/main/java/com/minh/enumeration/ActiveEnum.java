package com.minh.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum ActiveEnum {
    ACTIVE("ACTIVE", true),
    IN_ACTIVE("IN_ACTIVE", false),
    INVALID("INVALID", false);

    private final String value;
    private final boolean status;

    public static ActiveEnum value(String value) {
        return (StringUtils.isBlank(value))
                ? IN_ACTIVE
                : Arrays.stream(ActiveEnum.values()).filter(z -> z.getValue().equals(value)).findFirst().orElse(IN_ACTIVE);
    }

    public boolean status() {
        return status;
    }
}
