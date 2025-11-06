package com.minh.scholarship.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ApplicationDto;
import com.minh.scholarship.data.vo.ApplicationVo;
import com.minh.scholarship.model.filter.ApplicationFilter;
import com.minh.scholarship.service.ApplicationService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SCHOLARSHIP.APPLICATIONS)
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/page")
    public ApiResponse<Page<ApplicationVo>> getPage(@RequestBody ApplicationFilter filter) {
        return ApiResponse.ok(applicationService.getPage(filter));
    }

    @GetMapping("/all")
    public ApiResponse<List<ApplicationVo>> getAll() {
        return ApiResponse.ok(applicationService.getAll());
    }

    @Authorized
    @GetMapping("/my-application")
    public ApiResponse<List<ApplicationVo>> getAllMyApplication() {
        return ApiResponse.ok(applicationService.getAllMyApplication());
    }

    @GetMapping("/scholarship/{id}")
    public ApiResponse<List<ApplicationVo>> getApplicationByScholarshipId(@PathVariable Long id) {
        return ApiResponse.ok(applicationService.getApplicationByScholarshipId(id));
    }

    @GetMapping("/{id}")
    public ApiResponse<ApplicationDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(applicationService.getById(id));
    }

    @Authorized
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ApplicationVo> create(
            @RequestPart("application") String applicationJson,
            @RequestPart(value = "mediaFiles", required = false) List<MultipartFile> mediaFiles
    ) throws JsonProcessingException {
        ApplicationVo application = new ObjectMapper().readValue(applicationJson, ApplicationVo.class);
        return ApiResponse.ok(applicationService.create(application, mediaFiles));
    }

    @Authorized
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ApplicationVo> update(
            @PathVariable Long id,
            @RequestPart("application") String applicationJson,
            @RequestPart(value = "mediaFiles", required = false) List<MultipartFile> mediaFiles
    ) throws JsonProcessingException {
        ApplicationVo application = new ObjectMapper().readValue(applicationJson, ApplicationVo.class);
        return ApiResponse.ok(applicationService.update(id, application, mediaFiles));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        applicationService.delete(id);
        return ApiResponse.ok();
    }

}
