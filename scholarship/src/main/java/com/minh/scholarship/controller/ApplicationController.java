package com.minh.scholarship.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ApplicationDto;
import com.minh.scholarship.service.ApplicationService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
// import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SCHOLARSHIP.APPLICATIONS)
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/all")
    public ApiResponse<List<ApplicationDto>> getAll() {
        return ApiResponse.ok(applicationService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ApplicationDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(applicationService.getById(id));
    }

//    @Authorized
//    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ApiResponse<ApplicationDto> create(
//            @ModelAttribute ApplicationDto application,
//            @RequestPart(value = "documents", required = false) List<MultipartFile> documents) {
//
//        return ApiResponse.ok(applicationService.create(application, documents));
//    }

    @Authorized
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ApplicationDto> create(@RequestBody ApplicationDto application) {
        return ApiResponse.ok(applicationService.create(application));
    }

//    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ApiResponse<ApplicationDto> update(
//            @ModelAttribute ApplicationDto application,
//            @RequestPart(value = "documents", required = false) List<MultipartFile> documents) {
//
//        return ApiResponse.ok(applicationService.update(application, documents));
//    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ApplicationDto> update(@RequestBody ApplicationDto application) {
        return ApiResponse.ok(applicationService.update(application));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        applicationService.delete(id);
        return ApiResponse.ok();
    }
}
