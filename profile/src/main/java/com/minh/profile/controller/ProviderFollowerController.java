package com.minh.profile.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.profile.service.ProviderFollowerService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.PROFILES.FOLLOWERS)
public class ProviderFollowerController {

    @Autowired
    private ProviderFollowerService service;

    @Authorized
    @PostMapping("{id}")
    public ApiResponse<ProviderFollowerDto> create(@PathVariable Long id) {
        return ApiResponse.ok(service.create(id));
    }

    @Authorized
    @DeleteMapping("{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.ok();
    }

}
