package com.minh.profile.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderNewsDto;
import com.minh.profile.service.ProviderNewsService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(EndPoint.PROFILES.PROVIDER_NEW)
@RequiredArgsConstructor
public class ProviderNewsController {

    private final ProviderNewsService providerNewsService;

    @GetMapping
    public ApiResponse<List<ProviderNewsDto>> getAll() {
        return ApiResponse.ok(providerNewsService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ProviderNewsDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(providerNewsService.getById(id));
    }

    @Authorized
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProviderNewsDto> create(
            @RequestPart("news") String news,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws IOException {
        ProviderNewsDto newsDto = new ObjectMapper().readValue(news, ProviderNewsDto.class);
        return ApiResponse.ok(providerNewsService.create(newsDto, images));
    }

    @Authorized
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProviderNewsDto> update(
            @RequestPart("news") String news,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) throws IOException {
        ProviderNewsDto newsDto = new ObjectMapper().readValue(news, ProviderNewsDto.class);
        return ApiResponse.ok(providerNewsService.update(newsDto.getId(), newsDto, images));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        providerNewsService.delete(id);
        return ApiResponse.ok();
    }
}
