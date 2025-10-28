package com.minh.subscription.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.subscription.PaymentDto;
import com.minh.subscription.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SUBSCRIPTION.PAYMENTS)
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/all")
    public ApiResponse<List<PaymentDto>> getAll() {
        return ApiResponse.ok(paymentService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<PaymentDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(paymentService.getById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<PaymentDto> create(@RequestBody PaymentDto payment) {
        return ApiResponse.ok(paymentService.create(payment));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<PaymentDto> update(@RequestBody PaymentDto payment) {
        return ApiResponse.ok(paymentService.update(payment));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        paymentService.delete(id);
        return ApiResponse.ok();
    }
}
