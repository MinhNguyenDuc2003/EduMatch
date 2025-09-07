package com.minh.service.feign;

import feign.RetryableException;
import feign.Retryer;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.context.annotation.RequestScope;

@Log4j2
@RequestScope
@NoArgsConstructor
@AllArgsConstructor
public class FeignRetryer implements Retryer {

    private int attempt = 1;
    private int retryMaxAttempt;
    private long retryInterval;

    public FeignRetryer(int retryMaxAttempt, Long retryInterval) {
        this.retryMaxAttempt = retryMaxAttempt;
        this.retryInterval = retryInterval;
    }

    @Override
    public void continueOrPropagate(RetryableException e) {
        log.info("Feign retry attempt {} due to {} ", attempt, e.getMessage());
        if (attempt++ == retryMaxAttempt) {
            throw e;
        }
        try {
            Thread.sleep(retryInterval);
        } catch (InterruptedException ignored) {
            Thread.currentThread().interrupt();
        }
    }

    @Override
    public Retryer clone() {
        return new FeignRetryer(5, 1000L);
    }
}
