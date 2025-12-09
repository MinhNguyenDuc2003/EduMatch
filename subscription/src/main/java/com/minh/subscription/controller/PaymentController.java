package com.minh.subscription.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.MonthlyRevenueDto;
import com.minh.model.dto.subscription.PaymentDto;
import com.minh.model.dto.subscription.RevenueByUserTypeDto;
import com.minh.service.aspect.Authorized;
import com.minh.subscription.data.vo.PaymentVo;
import com.minh.subscription.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SUBSCRIPTION.PAYMENTS)
public class PaymentController {

    private final PaymentService orderService;

    @GetMapping("/all")
    public ApiResponse<List<PaymentVo>> getAll() {
        return ApiResponse.ok(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<PaymentVo> getById(@PathVariable Long id) {
        return ApiResponse.ok(orderService.getById(id));
    }

    @Authorized
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<PaymentDto> create(@RequestBody PaymentDto payment) {
        return ApiResponse.ok(orderService.create(payment));
    }

    @Authorized
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<PaymentDto> update(@RequestBody PaymentDto payment) {
        return ApiResponse.ok(orderService.update(payment));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ApiResponse.ok();
    }

    @Authorized
    @PostMapping("/confirm-payment")
    public ApiResponse<PaymentDto> confirmPayment(
            @RequestParam String transactionId,
            @RequestParam Long subscriptionPlanId) {

        PaymentDto updatedOrder = orderService.markAsPaid(transactionId, subscriptionPlanId);
        return ApiResponse.ok(updatedOrder);
    }

    @Authorized
    @PostMapping("/extend")
    public ApiResponse<PaymentDto> extendSubscription(
            @RequestParam Long subscriptionPlanId,
            @RequestParam String transactionId) {

        PaymentDto updatedOrder = orderService.extendSubscription(subscriptionPlanId, transactionId);
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

    @Authorized
    @GetMapping("/my-orders")
    public ApiResponse<List<PaymentVo>> getMyOrders() {
        return ApiResponse.ok(orderService.getOrderHistoryForUser());
    }
}
