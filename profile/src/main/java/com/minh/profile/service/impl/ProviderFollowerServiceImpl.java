package com.minh.profile.service.impl;

import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.profile.data.entity.junction.ProviderFollowerEntity;
import com.minh.profile.data.mapper.ProviderFollowerMapper;
import com.minh.profile.data.repository.ProviderFollowerRepository;
import com.minh.profile.service.ProviderFollowerService;
import com.minh.utils.UaaContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProviderFollowerServiceImpl implements ProviderFollowerService {

    @Autowired
    private ProviderFollowerRepository providerFollowerRepository;
    @Autowired
    private ProviderFollowerMapper providerFollowerMapper;

    @Override
    public ProviderFollowerDto create(Long id) {
        String userId = UaaContextHolder.getUserId();
        ProviderFollowerEntity providerFollowerEntity = new ProviderFollowerEntity();
        providerFollowerEntity.setProviderId(id);
        providerFollowerEntity.setUserId(userId);
        return providerFollowerMapper.toDto(providerFollowerRepository.save(providerFollowerEntity));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        providerFollowerRepository.deleteByProviderIdAndUserId(id, UaaContextHolder.getUserId());
    }

}
