package com.minh.profile.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderNewsDto;
import com.minh.profile.data.vo.ProviderNewsVo;
import com.minh.profile.service.ProviderNewsService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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
    public ApiResponse<List<ProviderNewsVo>> getAll() {
        return ApiResponse.ok(providerNewsService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<ProviderNewsVo> getById(@PathVariable Long id) {
        return ApiResponse.ok(providerNewsService.getById(id));
    }

    @Authorized
    @GetMapping("/my-news")
    public ApiResponse<List<ProviderNewsVo>> getMyNews() {
        return ApiResponse.ok(providerNewsService.getMyNews());
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
    @PutMapping
    public ApiResponse<ProviderNewsDto> update(@RequestBody ProviderNewsDto news) {
        return ApiResponse.ok(providerNewsService.update(news.getId(), news));
    }

    @Authorized
    @PutMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Boolean> addImagesToNews(@PathVariable Long id, @RequestPart(value = "mediaFiles", required = false) List<MultipartFile> mediaFiles) {
        return ApiResponse.ok(providerNewsService.addImagesToNews(id, mediaFiles));
    }

    @Authorized
    @DeleteMapping(value = "/{id}/images")
    public ApiResponse<Boolean> deleteImagesToNews(@PathVariable Long id, @RequestBody List<Long> mediaIds) {
        return ApiResponse.ok(providerNewsService.deleteImagesToNews(id, mediaIds));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        providerNewsService.delete(id);
        return ApiResponse.ok();
    }

    @GetMapping("/status/{active}")
    public ApiResponse<List<ProviderNewsVo>> getByStatus(@PathVariable boolean active) {
        return ApiResponse.ok(providerNewsService.getAllByStatus(active));
    }

    @Authorized
    @PutMapping("/{id}/status")
    public ApiResponse<Void> updateStatus(@PathVariable Long id, @RequestParam boolean active) {
        providerNewsService.updateStatus(id, active);
        return ApiResponse.ok();
    }
}
