package com.minh.profile.feign;

import com.minh.model.ApiResponse;
import com.minh.model.dto.media.MediaDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "MEDIA", path = "/media", contextId = "media-feign-client", configuration = FeignInterceptorConfig.class)
public interface MediaFeign {

    @GetMapping("medias/{id}")
    public ApiResponse<MediaDto> getById(@PathVariable Long id);

    @GetMapping("medias/all")
    public ApiResponse<List<MediaDto>> getById(@PathVariable List<Long> ids);

    @PostMapping("medias")
    public ApiResponse<MediaDto> create(@RequestBody MediaDto mediaDto);

    @PostMapping("medias/all")
    public ApiResponse<List<MediaDto>> createAll(@RequestBody List<MediaDto> medias);

    @PutMapping("medias")
    public ApiResponse<MediaDto> update(@RequestBody MediaDto mediaDto);

    @DeleteMapping("medias/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id);

}
