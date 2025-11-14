package com.minh.profile.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "NOTIFICATION", path = "/notification", contextId = "notification-feign-client", configuration = FeignInterceptorConfig.class)
public interface NotificationTemplateFeign {

    @GetMapping("templates/type")
    ApiResponse<NotificationTemplateDto> getNotificationTemplate(@RequestParam("type") String type);

}
