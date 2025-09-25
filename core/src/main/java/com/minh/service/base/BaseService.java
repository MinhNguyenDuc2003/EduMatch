package com.minh.service.base;

import lombok.extern.log4j.Log4j2;

@Log4j2
public abstract class BaseService {

    protected <T> T parseResponse(com.minh.model.ApiResponse<T> response) {
        try {
            if (response.isSuccess()) {
                return response.getData();
            }
        } catch (Exception exception) {
            log.error("PARSE RESPONSE GOT ERROR: {}", exception.getMessage(), exception);
        }
        return null;
    }

}
