package com.minh.subscription.controller;

import com.minh.constants.EndPoint;
import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.SubscriptionPlanDto;
import com.minh.subscription.service.SubscriptionPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SUBSCRIPTION.PLANS)
public class SubscriptionPlanController {

    private final SubscriptionPlanService subscriptionPlanService;

    @GetMapping("/all")
    public ApiResponse<List<SubscriptionPlanDto>> getAll() {
        return ApiResponse.ok(subscriptionPlanService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<SubscriptionPlanDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(subscriptionPlanService.getById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<SubscriptionPlanDto> create(@RequestBody SubscriptionPlanDto subscriptionPlan) {
        return ApiResponse.ok(subscriptionPlanService.create(subscriptionPlan));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<SubscriptionPlanDto> update(@RequestBody SubscriptionPlanDto subscriptionPlan) {
        return ApiResponse.ok(subscriptionPlanService.update(subscriptionPlan));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        subscriptionPlanService.delete(id);
        return ApiResponse.ok();
    }

    @GetMapping("/targetType/{targetType}")
    public List<SubscriptionPlanDto> getByTargetType(@PathVariable SubscriptionTargetType targetType) {
        return subscriptionPlanService.getByTargetType(targetType);
    }
}
