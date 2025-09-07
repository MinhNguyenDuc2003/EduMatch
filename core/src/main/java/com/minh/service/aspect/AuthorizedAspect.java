package com.minh.service.aspect;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.PermissionEnum;
import com.minh.exception.AuthorizationException;
import com.minh.service.security.UaaSession;
import com.minh.utils.UaaContextHolder;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.collections4.CollectionUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Log4j2
@Aspect
@Component
public class AuthorizedAspect {

    @Autowired
    private UaaSession uss;

    @Before(value = "@annotation(authorized)", argNames = "jp,authorized")
    public void checkAuthorization(final JoinPoint jp, final Authorized authorized) throws Throwable {
        uss.checkAuthorization();
        uss.checkUserInfo();
        checkHasAllPermission(authorized);
        checkHasAnyPermission(authorized);
        UaaContextHolder.setCustomInfo(uss);
    }

    private void checkHasAnyPermission(Authorized authorized) {
        PermissionEnum[] hasAny = authorized.hasAny();
        if (Objects.nonNull(hasAny) && hasAny.length > 0) {
            boolean valid = Boolean.FALSE;
            for (PermissionEnum any : hasAny) {
                if (uss.getRoles().contains(any.getRole())) {
                    valid = Boolean.TRUE;
                    break;
                }
            }
            if (!valid) {
                throw new AuthorizationException(CoreMessageCode.SERVICE_ACCESS_DENIED);
            }
        }
    }

    private void checkHasAllPermission(Authorized authorized) {
        if (CollectionUtils.isEmpty(uss.getRoles())) {
            throw new AuthorizationException(CoreMessageCode.SERVICE_ACCESS_DENIED);
        }
        PermissionEnum[] hasAll = authorized.hasAll();
        if (Objects.nonNull(hasAll) && hasAll.length > 0) {
            boolean valid = Boolean.TRUE;
            for (PermissionEnum all : hasAll) {
                if (uss.getRoles().contains(all.getRole())) {
                    valid = Boolean.FALSE;
                    break;
                }
            }
            if (!valid) {
                throw new AuthorizationException(CoreMessageCode.SERVICE_ACCESS_DENIED);
            }
        }
    }

}
