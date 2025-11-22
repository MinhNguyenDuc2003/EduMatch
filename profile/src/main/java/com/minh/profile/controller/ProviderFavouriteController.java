package com.minh.profile.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderFavouriteDto;
import com.minh.profile.data.vo.ProviderFavouriteVo;
import com.minh.profile.service.ProviderFavouriteService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EndPoint.PROFILES.PROVIDER_FAVOURITE)
@RequiredArgsConstructor
public class ProviderFavouriteController {

    private final ProviderFavouriteService service;

    @Authorized
    @GetMapping("/my-favourite")
    public ApiResponse<List<ProviderFavouriteVo>> getMyFavourite() {
        return ApiResponse.ok(service.getMyFavourite());
    }

    @Authorized
    @GetMapping("/{id}")
    public ApiResponse<ProviderFavouriteVo> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @Authorized
    @GetMapping("/user/{userId}")
    public ApiResponse<List<ProviderFavouriteVo>> getByUserId(@PathVariable String userId) {
        return ApiResponse.ok(service.getByUserId(userId));
    }

    @Authorized
    @GetMapping
    public ApiResponse<List<ProviderFavouriteVo>> getAll() {
        return ApiResponse.ok(service.getAll());
    }

    @Authorized
    @PostMapping
    public ApiResponse<ProviderFavouriteDto> create(@RequestBody ProviderFavouriteDto dto) {
        return ApiResponse.ok(service.create(dto));
    }

    @Authorized
    @PutMapping
    public ApiResponse<ProviderFavouriteDto> update(@RequestBody ProviderFavouriteDto dto) {
        return ApiResponse.ok(service.update(dto));
    }

    @Authorized
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.ok();
    }
}
