package com.minh.scholarship.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ScholarshipFollowerDto;
import com.minh.model.dto.scholarship.ScholarshipViewDto;
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

    @PostMapping("/ids")
    public ApiResponse<List<ScholarshipVo>> getByIds(@RequestBody List<Long> ids) {
        return ApiResponse.ok(scholarshipService.getByIds(ids));
    }

    @Authorized
    @GetMapping("/provider/{id}")
    public ApiResponse<List<ScholarshipVo>> getScholarshipByProviderId(@PathVariable Long id) {
        return ApiResponse.ok(scholarshipService.getScholarshipByProviderId(id));
    }

    @Authorized
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
    @PutMapping
    public ApiResponse<ScholarshipVo> update(@RequestBody ScholarshipVo scholarship) {
        return ApiResponse.ok(scholarshipService.update(scholarship));
    }

    @Authorized
    @PutMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Boolean> addImagesToScholarship(@PathVariable Long id, @RequestPart(value = "mediaFiles", required = false) List<MultipartFile> mediaFiles) {
        return ApiResponse.ok(scholarshipService.addImagesToScholarship(id, mediaFiles));
    }

    @Authorized
    @DeleteMapping(value = "/{id}/images")
    public ApiResponse<Boolean> deleteImagesToScholarship(@PathVariable Long id, @RequestBody List<Long> mediaIds) {
        return ApiResponse.ok(scholarshipService.deleteImagesToScholarship(id, mediaIds));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        scholarshipService.delete(id);
        return ApiResponse.ok();
    }

    @Authorized
    @GetMapping("/follow")
    public ApiResponse<List<ScholarshipVo>> getScholarshipFollow() {
        return ApiResponse.ok(scholarshipService.getScholarshipFollow());
    }

    @Authorized
    @GetMapping("/follow/{id}")
    public ApiResponse<ScholarshipFollowerDto> getMyScholarshipFollower(@PathVariable Long id) {
        return ApiResponse.ok(scholarshipService.getScholarshipFollower(id));
    }

    @Authorized
    @PostMapping("/follow")
    public ApiResponse<ScholarshipFollowerDto> createScholarshipFollower(@RequestBody ScholarshipFollowerDto dto) {
        return ApiResponse.ok(scholarshipService.createScholarshipFollower(dto));
    }

    @Authorized
    @DeleteMapping("/follow")
    public ApiResponse<ScholarshipFollowerDto> deleteScholarshipFollower(@RequestBody ScholarshipFollowerDto dto) {
        return ApiResponse.ok(scholarshipService.deleteScholarshipFollower(dto));
    }

    @GetMapping("/status")
    public ApiResponse<List<ScholarshipVo>> getByActiveStatus(@RequestParam boolean active) {
        return ApiResponse.ok(scholarshipService.getByActiveStatus(active));
    }

    @Authorized
    @PutMapping("/{id}/status")
    public ApiResponse<Boolean> updateScholarshipStatus(
            @PathVariable Long id,
            @RequestParam Boolean active
    ) {
        return ApiResponse.ok(scholarshipService.updateScholarshipStatus(id, active));
    }

    @GetMapping("/views/{id}")
    public ApiResponse<List<ScholarshipViewDto>> getViewsByScholarshipId(@PathVariable Long id) {
        return ApiResponse.ok(scholarshipService.getViewsByScholarshipId(id));
    }

    @GetMapping("/top-views/month")
    public ApiResponse<List<ScholarshipVo>> getTopViewsByMonth() {
        return ApiResponse.ok(scholarshipService.getTopViewsByMonth());
    }

}