package com.minh.service.feign;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.Constants;
import com.minh.exception.BusinessException;
import com.minh.model.ApiResponse;
import feign.Response;
import feign.RetryableException;
import feign.codec.ErrorDecoder;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.util.StreamUtils;

import java.io.ByteArrayOutputStream;
import java.util.Date;

@Log4j2
public class FeignErrorDecoder implements ErrorDecoder {

    private final ErrorDecoder defaultErrorDecoder = new Default();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Exception decode(String methodKey, Response response) {
        /* business exception from others service => not check and retry */
        if (HttpStatus.BAD_REQUEST.value() == response.status()) {
            return new BusinessException(extractContent(response));
        }

        Exception exception = defaultErrorDecoder.decode(methodKey, response);
        if (response.status() == HttpStatus.SERVICE_UNAVAILABLE.value()
                || response.status() == HttpStatus.NOT_FOUND.value()
                || response.status() == HttpStatus.REQUEST_TIMEOUT.value()
                || response.status() == HttpStatus.BAD_GATEWAY.value()
                || response.status() == HttpStatus.GATEWAY_TIMEOUT.value()
                || response.status() == HttpStatus.METHOD_NOT_ALLOWED.value()) {
            return new RetryableException(
                    response.status(),
                    "Retry for status code: " + response.status(),
                    response.request().httpMethod(), new Date(),
                    response.request());
        }

        return exception;
    }

    private String extractContent(Response response) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {
            StreamUtils.copy(response.body().asInputStream(), output);
            return objectMapper.readValue(output.toString(), new TypeReference<ApiResponse<String>>() {
            }).getMessage();
        } catch (Exception ex) {
            log.error("Extract response got {}", ex.getMessage());
        }
        return Constants.EMPTY;
    }

}
