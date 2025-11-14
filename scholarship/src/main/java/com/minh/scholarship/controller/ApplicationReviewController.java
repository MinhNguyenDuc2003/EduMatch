package com.minh.scholarship.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ApplicationReviewDto;
import com.minh.scholarship.service.ApplicationReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SCHOLARSHIP.APPLICATION_REVIEW)
public class ApplicationReviewController {

    private final ApplicationReviewService service;

    @GetMapping
    public ApiResponse<List<ApplicationReviewDto>> getAll() {
        return ApiResponse.ok(service.getAll());
    }

    @GetMapping("/all/application")
    public ApiResponse<List<ApplicationReviewDto>> getAllByApplicationId(@RequestParam Long applicationId) {
        return ApiResponse.ok(service.getAllByApplicationId(applicationId));
    }

    @GetMapping("/{id}")
    public ApiResponse<ApplicationReviewDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @PostMapping
    public ApiResponse<ApplicationReviewDto> create(@RequestBody ApplicationReviewDto dto) {
        return ApiResponse.ok(service.create(dto));
    }

    @PutMapping
    public ApiResponse<ApplicationReviewDto> update(@RequestBody ApplicationReviewDto dto) {
        return ApiResponse.ok(service.update(dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.ok();
    }

}
