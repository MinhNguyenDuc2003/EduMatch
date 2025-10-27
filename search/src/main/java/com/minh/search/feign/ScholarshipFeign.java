package com.minh.search.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "SCHOLARSHIP", path = "/scholarship", contextId = "scholarship-feign-client", configuration = FeignInterceptorConfig.class)
public interface ScholarshipFeign {

    @GetMapping("/scholarships/{id}")
    ApiResponse<ScholarshipDto> getById(@PathVariable Long id);

}
