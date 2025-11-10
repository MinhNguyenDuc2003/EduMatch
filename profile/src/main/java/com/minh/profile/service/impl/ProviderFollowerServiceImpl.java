package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.entity.junction.ProviderFollowerEntity;
import com.minh.profile.data.mapper.ProviderFollowerMapper;
import com.minh.profile.data.repository.ProviderFollowerRepository;
import com.minh.profile.data.repository.ProviderProfileRepository;
import com.minh.profile.data.vo.ProviderProfileVo;
import com.minh.profile.service.ProviderFollowerService;
import com.minh.profile.service.ProviderProfileService;
import com.minh.utils.UaaContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProviderFollowerServiceImpl implements ProviderFollowerService {

    @Autowired
    private ProviderFollowerRepository providerFollowerRepository;
    @Autowired
    private ProviderProfileRepository providerProfileRepository;
    @Autowired
    private ProviderFollowerMapper providerFollowerMapper;
    @Autowired
    private ProviderProfileService profileService;

    @Override
    public ProviderFollowerDto create(Long id) {
        String userId = UaaContextHolder.getUserId();

        boolean exists = providerProfileRepository.existsById(id);
        if (!exists) {
            throw new BusinessException(CoreMessageCode.PROVIDER_NOT_FOUND);
        }

        boolean alreadyFollowed = providerFollowerRepository.existsByProviderIdAndUserId(id, userId);
        if (alreadyFollowed) {
            throw new BusinessException(CoreMessageCode.PROVIDER_ALREADY_FOLLOWED);
        }

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

    @Override
    public List<ProviderFollowerDto> getAllFollowers(String userId) {
        Optional<ProviderProfileEntity> provider = providerProfileRepository.findByUserId(userId);
        if (provider.isEmpty()) {
            throw new BusinessException(CoreMessageCode.PROVIDER_PROFILE_IS_NOT_EXIST);
        }
        return providerFollowerMapper.toDto(providerFollowerRepository.findByProviderId(provider.get().getId()));
    }

    @Override
    public List<ProviderProfileVo> getAllProviders() {
        String userId = UaaContextHolder.getUserId();
        List<ProviderProfileVo> vos = new ArrayList<>();
        List<ProviderFollowerEntity> providerFollowerEntities = providerFollowerRepository.findByUserId(userId);
        providerFollowerEntities.forEach(providerFollower -> {
            vos.add(profileService.getById(providerFollower.getProviderId()));
        });
        return vos;
    }

    @Override
    public List<ProviderProfileVo> getAllMyFollowers() {
        String userId = UaaContextHolder.getUserId();
        List<ProviderProfileVo> vos = new ArrayList<>();
        List<ProviderFollowerEntity> providerFollowerEntities = providerFollowerRepository.findByUserId(userId);
        providerFollowerEntities.forEach(providerFollower -> {
            vos.add(profileService.getById(providerFollower.getProviderId()));
        });
        return vos;
    }

}
