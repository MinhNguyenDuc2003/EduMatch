package com.minh.scholarship.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SCHOLARSHIP.SCHOLARSHIPS)
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

    @Authorized
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ScholarshipDto> create(
            @RequestPart("scholarship") String scholarshipJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws JsonProcessingException {

        ScholarshipDto scholarship = new ObjectMapper().readValue(scholarshipJson, ScholarshipDto.class);
        return ApiResponse.ok(scholarshipService.create(scholarship, images));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ScholarshipDto> update(@RequestBody ScholarshipDto scholarship) {
        return ApiResponse.ok(scholarshipService.update(scholarship, null));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        scholarshipService.delete(id);
        return ApiResponse.ok();
    }

}