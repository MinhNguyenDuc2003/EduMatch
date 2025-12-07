package com.minh.scholarship.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.scholarship.data.entity.CaseStudyEntity;
import com.minh.scholarship.data.vo.CaseStudyVo;
import com.minh.scholarship.service.CaseStudyService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SCHOLARSHIP.CASE_STUDY)
public class CaseStudyController {

    private final CaseStudyService caseStudyService;

    @GetMapping("/all")
    public ApiResponse<List<CaseStudyVo>> getAll() {
        return ApiResponse.ok(caseStudyService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<CaseStudyVo> getById(@PathVariable Long id) {
        return ApiResponse.ok(caseStudyService.getById(id));
    }

    @GetMapping("/all/{scholarshipId}")
    public ApiResponse<List<CaseStudyVo>> getByScholarshipId(@PathVariable Long scholarshipId) {
        return ApiResponse.ok(caseStudyService.getByScholarshipId(scholarshipId));
    }

    @Authorized
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<CaseStudyVo> create(
            @RequestPart("caseStudy") String caseStudyJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws JsonProcessingException {
        CaseStudyVo caseStudy = new ObjectMapper().readValue(caseStudyJson, CaseStudyVo.class);
        return ApiResponse.ok(caseStudyService.create(caseStudy, images));
    }

    @Authorized
    @PutMapping
    public ApiResponse<CaseStudyVo> update(@RequestBody CaseStudyVo caseStudy) {
        return ApiResponse.ok(caseStudyService.update(caseStudy));
    }

    @Authorized
    @GetMapping("/verified/{id}")
    public ApiResponse<CaseStudyEntity> update(@PathVariable Long id, @RequestParam Boolean verified) {
        return ApiResponse.ok(caseStudyService.updateVerified(id, verified));
    }

}
