package com.minh.subscription.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.OrderDto;
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

    private final OrderService paymentService;

    @GetMapping("/test")
    public ApiResponse<?> testCi() {
        return ApiResponse.ok("Hello world 2");
    }

    @GetMapping("/all")
    public ApiResponse<List<OrderDto>> getAll() {
        return ApiResponse.ok(paymentService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(paymentService.getById(id));
    }

    @Authorized
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<OrderDto> create(@RequestBody OrderDto payment) {
        return ApiResponse.ok(paymentService.create(payment));
    }

    @Authorized
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<OrderDto> update(@RequestBody OrderDto payment) {
        return ApiResponse.ok(paymentService.update(payment));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        paymentService.delete(id);
        return ApiResponse.ok();
    }

    @Authorized
    @PostMapping("/confirm-order")
    public ApiResponse<OrderDto> confirmPayment(
            @RequestParam String transactionId,
            @RequestParam Long subscriptionPlanId) {

        OrderDto updatedOrder = paymentService.markAsPaid(transactionId, subscriptionPlanId);
        return ApiResponse.ok(updatedOrder);
    }
}
