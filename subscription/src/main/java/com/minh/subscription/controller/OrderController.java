package com.minh.subscription.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.MonthlyRevenueDto;
import com.minh.model.dto.subscription.OrderDto;
import com.minh.model.dto.subscription.RevenueByUserTypeDto;
import com.minh.service.aspect.Authorized;
import com.minh.subscription.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SUBSCRIPTION.ORDERS)
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/all")
    public ApiResponse<List<OrderDto>> getAll() {
        return ApiResponse.ok(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(orderService.getById(id));
    }

    @Authorized
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<OrderDto> create(@RequestBody OrderDto payment) {
        return ApiResponse.ok(orderService.create(payment));
    }

    @Authorized
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<OrderDto> update(@RequestBody OrderDto payment) {
        return ApiResponse.ok(orderService.update(payment));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ApiResponse.ok();
    }

    @Authorized
    @PostMapping("/confirm-order")
    public ApiResponse<OrderDto> confirmPayment(
            @RequestParam String transactionId,
            @RequestParam Long subscriptionPlanId) {

        OrderDto updatedOrder = orderService.markAsPaid(transactionId, subscriptionPlanId);
        return ApiResponse.ok(updatedOrder);
    }

    @Authorized
    @PostMapping("/extend")
    public ApiResponse<OrderDto> extendSubscription(
            @RequestParam Long subscriptionId,
            @RequestParam Long subscriptionPlanId,
            @RequestParam String transactionId) {

        OrderDto updatedOrder = orderService.extendSubscription(subscriptionId, subscriptionPlanId, transactionId);
        return ApiResponse.ok(updatedOrder);
    }

    @GetMapping("/revenue-by-month")
    public ApiResponse<List<MonthlyRevenueDto>> getMonthlyRevenue() {
        return ApiResponse.ok(orderService.getMonthlyRevenue());
    }

    @GetMapping("/revenue-by-usertype")
    public ApiResponse<List<RevenueByUserTypeDto>> getRevenueByUserType() {
        return ApiResponse.ok(orderService.getRevenueByUserType());
    }

    @GetMapping("/monthly-revenue")
    public ApiResponse<List<MonthlyRevenueDto>> getRevenueByMonth() {
        return ApiResponse.ok(orderService.getRevenueByMonth());
    }
}
