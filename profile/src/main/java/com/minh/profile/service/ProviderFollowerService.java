package com.minh.profile.service;

import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.profile.data.vo.ProviderProfileVo;

import java.util.List;

public interface ProviderFollowerService {

    ProviderFollowerDto create(Long id);

    void delete(Long id);

    List<ProviderFollowerDto> getAllFollowers(String userId);

    List<ProviderFollowerDto> getAllProviders();

    List<ProviderProfileVo> getAllMyFollowers();

}
