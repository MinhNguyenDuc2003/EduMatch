package com.minh.report.controller;

import com.minh.constants.EndPoint;
import com.minh.enumeration.report.ReportCategoryType;
import com.minh.model.ApiResponse;
import com.minh.model.dto.report.ReportCategoryDto;
import com.minh.report.service.ReportCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.REPORT.CATEGORY)
public class ReportCategoryController {

    private final ReportCategoryService service;

    @GetMapping("/all")
    public ApiResponse<List<ReportCategoryDto>> getAll() {
        return ApiResponse.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ReportCategoryDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ReportCategoryDto> create(@RequestBody ReportCategoryDto dto) {
        return ApiResponse.ok(service.create(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ReportCategoryDto> update(@RequestBody ReportCategoryDto dto) {
        return ApiResponse.ok(service.update(dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.ok();
    }

    @GetMapping("/type/{type}")
    public ApiResponse<List<ReportCategoryDto>> getByType(@PathVariable ReportCategoryType type) {
        return ApiResponse.ok(service.getByType(type));
    }
}

