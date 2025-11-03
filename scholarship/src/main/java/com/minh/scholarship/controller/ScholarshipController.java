package com.minh.scholarship.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ScholarshipFollowerDto;
import com.minh.scholarship.data.vo.ScholarshipVo;
import com.minh.scholarship.model.filter.ScholarshipFilter;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SCHOLARSHIP.SCHOLARSHIPS)
public class ScholarshipController {

    private final ScholarshipService scholarshipService;

    @PostMapping("/page")
    public ApiResponse<Page<ScholarshipVo>> getPage(@RequestBody ScholarshipFilter filter) {
        return ApiResponse.ok(scholarshipService.getPage(filter));
    }

    @GetMapping("/{id}")
    public ApiResponse<ScholarshipVo> getById(@PathVariable Long id) {
        return ApiResponse.ok(scholarshipService.getById(id));
    }

    @GetMapping("/provider/{id}")
    public ApiResponse<List<ScholarshipVo>> getScholarshipByProviderId(@PathVariable Long id) {
        return ApiResponse.ok(scholarshipService.getScholarshipByProviderId(id));
    }

    @GetMapping("/slug")
    public ApiResponse<ScholarshipVo> getBySlug(@RequestParam String slug) {
        return ApiResponse.ok(scholarshipService.getBySlug(slug));
    }

    @GetMapping("/{id}/all")
    public ApiResponse<ScholarshipVo> getByIdAll(@PathVariable Long id) {
        return ApiResponse.ok(scholarshipService.getByIdAll(id));
    }

    @Authorized
    @GetMapping("/my-scholarship")
    public ApiResponse<List<ScholarshipVo>> getMyScholarship() {
        return ApiResponse.ok(scholarshipService.getMyScholarship());
    }

    @Authorized
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ScholarshipVo> create(
            @RequestPart("scholarship") String scholarshipJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws JsonProcessingException {
        ScholarshipVo scholarship = new ObjectMapper().readValue(scholarshipJson, ScholarshipVo.class);
        return ApiResponse.ok(scholarshipService.create(scholarship, images));
    }

    @Authorized
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ScholarshipVo> update(
            @RequestPart("scholarship") String scholarshipJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws JsonProcessingException {
        ScholarshipVo scholarship = new ObjectMapper().readValue(scholarshipJson, ScholarshipVo.class);
        return ApiResponse.ok(scholarshipService.update(scholarship, images));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        scholarshipService.delete(id);
        return ApiResponse.ok();
    }

    @GetMapping("/follow")
    public ApiResponse<List<ScholarshipVo>> getScholarshipFollow() {
        return ApiResponse.ok(scholarshipService.getScholarshipFollow());
    }

    @PostMapping("/follow")
    public ApiResponse<ScholarshipFollowerDto> createScholarshipFollower(@RequestBody ScholarshipFollowerDto dto) {
        return ApiResponse.ok(scholarshipService.createScholarshipFollower(dto));
    }

    @DeleteMapping("/follow")
    public ApiResponse<ScholarshipFollowerDto> deleteScholarshipFollower(@RequestBody ScholarshipFollowerDto dto) {
        return ApiResponse.ok(scholarshipService.deleteScholarshipFollower(dto));
    }

}