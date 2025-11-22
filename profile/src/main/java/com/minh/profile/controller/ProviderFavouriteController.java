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

    private final ProviderFavouriteService providerFavouriteService;

    @Authorized
    @GetMapping("/my-favourite")
    public ApiResponse<List<ProviderFavouriteVo>> getMyFavourite() {
        return ApiResponse.ok(providerFavouriteService.getMyFavourite());
    }

    @Authorized
    @GetMapping
    public ApiResponse<List<ProviderFavouriteVo>> getAll() {
        return ApiResponse.ok(providerFavouriteService.getAll());
    }

    @Authorized
    @GetMapping("/{id}")
    public ApiResponse<ProviderFavouriteVo> getById(@PathVariable Long id) {
        return ApiResponse.ok(providerFavouriteService.getById(id));
    }

    @Authorized
    @GetMapping("/applicant/{applicantId}")
    public ApiResponse<List<ProviderFavouriteVo>> getByProviderId(@PathVariable Long applicantId) {
        return ApiResponse.ok(providerFavouriteService.getByApplicantId(applicantId));
    }

    @Authorized
    @PostMapping
    public ApiResponse<ProviderFavouriteDto> create(@RequestBody ProviderFavouriteDto dto) {
        return ApiResponse.ok(providerFavouriteService.create(dto));
    }

    @Authorized
    @PutMapping
    public ApiResponse<ProviderFavouriteDto> update(@RequestBody ProviderFavouriteDto dto) {
        return ApiResponse.ok(providerFavouriteService.update(dto));
    }

    @Authorized
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        providerFavouriteService.delete(id);
        return ApiResponse.ok();
    }
}
