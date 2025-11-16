package com.minh.subscription.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.OrderDto;
import com.minh.subscription.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SUBSCRIPTION.PAYMENTS)
public class OrderController {

    private final OrderService paymentService;

    @GetMapping("/all")
    public ApiResponse<List<OrderDto>> getAll() {
        return ApiResponse.ok(paymentService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(paymentService.getById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<OrderDto> create(@RequestBody OrderDto payment) {
        return ApiResponse.ok(paymentService.create(payment));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<OrderDto> update(@RequestBody OrderDto payment) {
        return ApiResponse.ok(paymentService.update(payment));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        paymentService.delete(id);
        return ApiResponse.ok();
    }

    @PostMapping("/confirm-payment")
    public ApiResponse<OrderDto> confirmPayment(@RequestParam String transactionId) {
        OrderDto updatedOrder = paymentService.markAsPaid(transactionId);
        return ApiResponse.ok(updatedOrder);
    }
}
