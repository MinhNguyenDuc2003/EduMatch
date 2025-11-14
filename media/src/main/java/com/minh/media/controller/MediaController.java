package com.minh.media.controller;

import com.minh.constants.EndPoint;
import com.minh.media.service.MediaService;
import com.minh.model.ApiResponse;
import com.minh.model.dto.media.MediaDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.MEDIA.MEDIA)
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @GetMapping("/{id}")
    public ApiResponse<MediaDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(mediaService.getById(id));
    }

    @PostMapping("/list")
    public ApiResponse<List<MediaDto>> getByIds(@RequestBody List<Long> ids) {
        return ApiResponse.ok(mediaService.getByIds(ids));
    }

    @PostMapping
    public ApiResponse<MediaDto> create(@RequestBody MediaDto mediaDto) {
        return ApiResponse.ok(mediaService.saveOne(mediaDto));
    }

    @PostMapping("/all")
    public ApiResponse<List<MediaDto>> createAll(@RequestBody List<MediaDto> medias) {
        return ApiResponse.ok(mediaService.saveAll(medias));
    }

    @PutMapping
    public ApiResponse<MediaDto> update(@RequestBody MediaDto mediaDto) {
        return ApiResponse.ok(mediaService.updateOne(mediaDto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        mediaService.deleteById(id);
        return ApiResponse.ok();
    }

}
