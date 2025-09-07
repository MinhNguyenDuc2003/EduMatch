package com.minh.service.aspect;

import com.minh.enumeration.PermissionEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Authorized {

    PermissionEnum[] hasAny() default {};
    PermissionEnum[] hasAll() default {};
    
}
