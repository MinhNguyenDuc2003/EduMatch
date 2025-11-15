package com.minh.scholarship.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ApplicationScholarshipDto;
import com.minh.scholarship.data.vo.ApplicationScholarshipVo;
import com.minh.scholarship.service.ApplicationScholarshipService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SCHOLARSHIP.APPLICATION_SCHOLARSHIP)
public class ApplicationScholarshipController {

    private final ApplicationScholarshipService service;

    @GetMapping
    public ApiResponse<List<ApplicationScholarshipVo>> getAll() {
        return ApiResponse.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ApplicationScholarshipVo> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @GetMapping("/by-application")
    public ApiResponse<List<ApplicationScholarshipVo>> getByApplicationId(@RequestParam Long applicationId) {
        return ApiResponse.ok(service.getAllByApplicationId(applicationId));
    }

    @GetMapping("/by-scholarship")
    public ApiResponse<List<ApplicationScholarshipVo>> getByScholarshipId(@RequestParam Long scholarshipId) {
        return ApiResponse.ok(service.getAllByScholarshipId(scholarshipId));
    }

    @Authorized
    @GetMapping("/my")
    public ApiResponse<List<ApplicationScholarshipVo>> getByMyScholarship() {
        return ApiResponse.ok(service.getByMyScholarship());
    }

    @GetMapping("/by-status")
    public ApiResponse<List<ApplicationScholarshipDto>> getByStatus(@RequestParam String status) {
        return ApiResponse.ok(service.getAllByStatus(status));
    }

    @PostMapping
    public ApiResponse<ApplicationScholarshipDto> create(@RequestBody ApplicationScholarshipDto dto) {
        return ApiResponse.ok(service.create(dto));
    }

    @PutMapping
    public ApiResponse<ApplicationScholarshipDto> update(@RequestBody ApplicationScholarshipDto dto) {
        return ApiResponse.ok(service.update(dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.ok();
    }
}
