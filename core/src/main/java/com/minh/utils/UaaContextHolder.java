package com.minh.utils;

import com.minh.service.security.UaaSession;
import org.apache.commons.lang3.ObjectUtils;

public class UaaContextHolder {

    private static final ThreadLocal<UaaSession> customInfo = new ThreadLocal<>();

    public static void setCustomInfo(UaaSession info) {
        customInfo.set(info);
    }

    public static UaaSession getCustomInfo() {
        return customInfo.get();
    }

    public static String getUsername() {
        if (ObjectUtils.isNotEmpty(getCustomInfo())
                && ObjectUtils.isNotEmpty(getCustomInfo().getUsername())) {
            return getCustomInfo().getUsername();
        }

        return "system";
    }

    public static String getUserId() {
        if (ObjectUtils.isNotEmpty(getCustomInfo())
                && ObjectUtils.isNotEmpty(getCustomInfo().getUserId())) {
            return getCustomInfo().getUserId();
        }

        return null;
    }




}
