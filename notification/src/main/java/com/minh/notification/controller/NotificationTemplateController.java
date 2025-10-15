package com.minh.notification.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.notification.service.NotificationTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.NOTIFICATION.NOTIFICATION_TEMPLATES)
public class NotificationTemplateController {

    @Autowired
    private NotificationTemplateService notificationTemplateService;

    @GetMapping("/type")
    public ApiResponse<NotificationTemplateDto> getNotificationTemplate(@RequestParam("type") String type) {
        return ApiResponse.ok(notificationTemplateService.getByType(type));
    }

}
