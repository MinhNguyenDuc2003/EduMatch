package com.minh.enumeration.mail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum MailTypeEnum {

    APPLICATION_UPDATED("APPLICATION_UPDATED"),
    SCHOLARSHIP_RECOMMENDATION("SCHOLARSHIP_RECOMMENDATION"),
    PROVIDER_APPROVED("PROVIDER_APPROVED"),
    SUBSCRIPTION_EXPIRING("SUBSCRIPTION_EXPIRING"),
    APPLICATION_SUBMITTED("APPLICATION_SUBMITTED"),
    PROVIDER_VERIFIED("PROVIDER_VERIFIED"),
    REFERRAL_APPLICATION("REFERRAL_APPLICATION"),
    INVALID("INVALID");

    private final String code;

    public static MailTypeEnum of(String code) {
        return (StringUtils.isBlank(code))
                ? INVALID
                : Arrays.stream(MailTypeEnum.values())
                .filter(z -> z.getCode().equals(code))
                .findFirst()
                .orElse(INVALID);
    }

}
