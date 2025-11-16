package com.minh.report.controller;

import com.minh.constants.EndPoint;
import com.minh.enumeration.report.ReportCategoryType;
import com.minh.model.ApiResponse;
import com.minh.model.dto.report.ReportDto;
import com.minh.report.service.ReportService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.REPORT.REPORTS)
public class ReportController {

    private final ReportService service;

    @GetMapping("/all")
    public ApiResponse<List<ReportDto>> getAll() {
        return ApiResponse.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ReportDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @Authorized
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ReportDto> create(@RequestBody ReportDto dto) {
        return ApiResponse.ok(service.create(dto));
    }

    @Authorized
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ReportDto> update(@RequestBody ReportDto dto) {
        return ApiResponse.ok(service.update(dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.ok();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<ReportDto>> getByUserId(@PathVariable String userId) {
        return ApiResponse.ok(service.getByUserId(userId));
    }

    @Authorized
    @GetMapping("/my-report")
    public ApiResponse<List<ReportDto>> getMyReports() {
        return ApiResponse.ok(service.getMyReports());
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<ReportDto>> getByCategory(@PathVariable Long categoryId) {
        return ApiResponse.ok(service.getByCategory(categoryId));
    }

    @GetMapping("/is-read/{isRead}")
    public ApiResponse<List<ReportDto>> getByIsRead(@PathVariable Boolean isRead) {
        return ApiResponse.ok(service.getByIsRead(isRead));
    }

    @PostMapping("/{id}/reply")
    public ApiResponse<ReportDto> reply(@PathVariable Long id, @RequestBody String reply) {
        return ApiResponse.ok(service.replyToReport(id, reply));
    }
}
