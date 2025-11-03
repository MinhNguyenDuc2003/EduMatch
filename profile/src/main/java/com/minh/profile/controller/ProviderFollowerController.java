package com.minh.profile.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.profile.data.vo.ProviderProfileVo;
import com.minh.profile.service.ProviderFollowerService;
import com.minh.service.aspect.Authorized;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.PROFILES.FOLLOWERS)
public class ProviderFollowerController {

    @Autowired
    private ProviderFollowerService service;

    @Authorized
    @GetMapping("/all")
    public ApiResponse<List<ProviderFollowerDto>> getAllFollowers(@RequestParam("userId") String userId) {
        return ApiResponse.ok(service.getAllFollowers(userId));
    }

    @Authorized
    @GetMapping("/my-follow")
    public ApiResponse<List<ProviderProfileVo>> getAllMyFollowers() {
        return ApiResponse.ok(service.getAllMyFollowers());
    }

    @Authorized
    @GetMapping("/providers")
    public ApiResponse<List<ProviderFollowerDto>> getAllProviders() {
        return ApiResponse.ok(service.getAllProviders());
    }

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
