package com.minh.notification.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.notification.UserNotificationDto;
import com.minh.notification.service.UserNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.NOTIFICATION.USER_NOTIFICATIONS)
public class UserNotificationController {

    @Autowired
    private UserNotificationService userNotificationService;

    @GetMapping("/user")
    public ApiResponse<List<UserNotificationDto>> getByUser() {
        return ApiResponse.ok(userNotificationService.getByUser());
    }

    @PostMapping
    public ApiResponse<UserNotificationDto> create(@RequestBody UserNotificationDto userNotificationDto) {
        return ApiResponse.ok(userNotificationService.createOne(userNotificationDto));
    }

    @PostMapping("/all")
    public ApiResponse<List<UserNotificationDto>> createAll(@RequestBody List<UserNotificationDto> userNotificationDto) {
        return ApiResponse.ok(userNotificationService.createAll(userNotificationDto));
    }

}
