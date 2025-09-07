package com.minh.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PermissionEnum {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    private final String role;

}
