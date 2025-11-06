package com.minh.subscription.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.SubscriptionDto;
import com.minh.service.aspect.Authorized;
import com.minh.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SUBSCRIPTION.SUBSCRIPTIONS)
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @GetMapping("/all")
    public ApiResponse<List<SubscriptionDto>> getAll() {
        return ApiResponse.ok(subscriptionService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<SubscriptionDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(subscriptionService.getById(id));
    }

    @Authorized
    @PostMapping
    public ApiResponse<SubscriptionDto> create(@RequestBody SubscriptionDto subscription) {
        return ApiResponse.ok(subscriptionService.create(subscription));
    }

    @Authorized
    @PutMapping
    public ApiResponse<SubscriptionDto> update(@RequestBody SubscriptionDto subscription) {
        return ApiResponse.ok(subscriptionService.update(subscription));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        subscriptionService.delete(id);
        return ApiResponse.ok();
    }

//    @GetMapping("/current")
//    public ApiResponse<SubscriptionDto> getCurrentSubscription() {
//        return ApiResponse.ok(subscriptionService.getCurrentSubscriptionByUser());
//    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<SubscriptionDto>> getAllSubscriptionsByUserId(@PathVariable String userId) {
        return ApiResponse.ok(subscriptionService.getAllSubscriptionsByUserId(userId));
    }
}
