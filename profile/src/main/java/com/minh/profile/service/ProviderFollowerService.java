package com.minh.profile.service;

import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.profile.data.entity.junction.ProviderFollowerEntity;
import com.minh.profile.data.vo.ProviderProfileVo;

import java.util.List;
import java.util.Optional;

public interface ProviderFollowerService {

    ProviderFollowerDto create(Long id);

    void delete(Long id);

    List<ProviderFollowerDto> getAllFollowers(String userId);

    List<ProviderProfileVo> getAllProviders();

    List<ProviderProfileVo> getAllMyFollowers();

    ProviderFollowerEntity getByUserIdAndProviderId(String userId, Long id);
}
