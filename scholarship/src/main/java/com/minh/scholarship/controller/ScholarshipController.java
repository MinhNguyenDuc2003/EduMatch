package com.minh.scholarship.controller;

import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.service.ScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("EndPoint.SCHOLARSHIP.SCHOLARSHIPS")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;

    @GetMapping("/all")
    public ApiResponse<List<ScholarshipDto>> getAll() {
        return ApiResponse.ok(scholarshipService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ScholarshipDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(scholarshipService.getById(id));
    }

    @PostMapping
    public ApiResponse<ScholarshipDto> create(@RequestBody ScholarshipDto scholarship) {
        return ApiResponse.ok(scholarshipService.create(scholarship));
    }

    @PutMapping()
    public ApiResponse<ScholarshipDto> update(@RequestBody ScholarshipDto scholarship) {
        return ApiResponse.ok(scholarshipService.update(scholarship));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        scholarshipService.delete(id);
        return ApiResponse.ok();
    }

}