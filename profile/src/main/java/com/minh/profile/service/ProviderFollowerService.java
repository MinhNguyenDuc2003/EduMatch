package com.minh.profile.service;

import com.minh.model.dto.profile.ProviderFollowerDto;

public interface ProviderFollowerService {

    ProviderFollowerDto create(Long id);

    void delete(Long id);
}
