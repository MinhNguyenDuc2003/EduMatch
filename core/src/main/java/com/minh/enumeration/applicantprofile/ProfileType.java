package com.minh.enumeration.applicantprofile;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum ProfileType {
    EXPECTED("Expected"),
    CURRENT("Current");

    private final String value;

    ProfileType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static ProfileType fromValue(String value) {
        for (ProfileType type : ProfileType.values()) {
            if (type.value.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid ProfileType: " + value);
    }
}


