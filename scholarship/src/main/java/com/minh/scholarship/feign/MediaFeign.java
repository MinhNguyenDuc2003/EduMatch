package com.minh.scholarship.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.media.MediaDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "MEDIA", path = "/media", contextId = "media-feign-client", configuration = FeignInterceptorConfig.class)
public interface MediaFeign {

    @GetMapping("medias/{id}")
    ApiResponse<MediaDto> getById(@PathVariable Long id);

    @PostMapping("medias/list")
    ApiResponse<List<MediaDto>> getByIds(@RequestBody List<Long> ids);

    @PostMapping("medias")
    ApiResponse<MediaDto> create(@RequestBody MediaDto mediaDto);

    @PostMapping("medias/all")
    ApiResponse<List<MediaDto>> createAll(@RequestBody List<MediaDto> medias);

    @PutMapping("medias")
    ApiResponse<MediaDto> update(@RequestBody MediaDto mediaDto);

    @DeleteMapping("medias/{id}")
    ApiResponse<Void> delete(@PathVariable Long id);

}
