package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.profile.ProviderFavouriteDto;
import com.minh.profile.data.entity.ProviderFavouriteEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.mapper.ProviderFavouriteMapper;
import com.minh.profile.data.repository.ProviderFavouriteRepository;
import com.minh.profile.data.repository.ProviderProfileRepository;
import com.minh.profile.data.vo.ProviderFavouriteVo;
import com.minh.profile.service.ProviderFavouriteService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProviderFavouriteServiceImpl extends BaseService implements ProviderFavouriteService {

    private final ProviderFavouriteRepository providerFavouriteRepository;
    private final ProviderProfileRepository providerProfileRepository;
    private final ProviderFavouriteMapper providerFavouriteMapper;

    private ProviderFavouriteVo enrich(ProviderFavouriteEntity entity) {
        ProviderFavouriteVo vo = providerFavouriteMapper.entityToVo(entity);

        ProviderProfileEntity provider = providerProfileRepository.findById(entity.getProviderId())
                .orElse(null);
        if (provider != null) {
            vo.setProviderProfileVo(providerFavouriteMapper.providerEntityToVo(provider));
        }

        // Set isFavourite
        String userId = UaaContextHolder.getUserId();
        boolean favouriteExists = providerFavouriteRepository.existsByUserIdAndProviderId(userId, entity.getProviderId());
        vo.setIsFavourite(favouriteExists ? 1 : 0);

        return vo;
    }

    @Override
    public List<ProviderFavouriteVo> getMyFavourite() {
        String userId = UaaContextHolder.getUserId();

        return providerFavouriteRepository
                .findAllByUserIdAndActive(userId, true)
                .stream()
                .map(this::enrich)
                .collect(Collectors.toList());
    }

    @Override
    public ProviderFavouriteVo getById(Long id) {
        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_FAVOURITE_NOT_FOUND));

        return enrich(entity);
    }

    @Override
    @Transactional
    public ProviderFavouriteDto create(ProviderFavouriteDto dto) {
        String userId = UaaContextHolder.getUserId();
        dto.setUserId(userId);

        // Không cho trùng favourite
        if (providerFavouriteRepository.existsByUserIdAndProviderId(userId, dto.getProviderId())) {
            throw new BusinessException(CoreMessageCode.PROVIDER_ALREADY_ADDED_TO_FAVOURITE);
        }

        if (!providerProfileRepository.existsById(dto.getProviderId())) {
            throw new BusinessException(CoreMessageCode.PROVIDER_NOT_FOUND);
        }

        ProviderFavouriteEntity entity = providerFavouriteMapper.toEntity(dto);
        ProviderFavouriteEntity saved = providerFavouriteRepository.save(entity);

        return providerFavouriteMapper.entityToVo(saved);
    }

    @Override
    @Transactional
    public ProviderFavouriteDto update(Long id, ProviderFavouriteDto dto) {
        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_FAVOURITE_NOT_FOUND));

        if (!providerProfileRepository.existsById(dto.getProviderId())) {
            throw new BusinessException(CoreMessageCode.PROVIDER_NOT_FOUND);
        }

        providerFavouriteMapper.updateEntityFromDto(dto, entity);
        providerFavouriteRepository.save(entity);

        return providerFavouriteMapper.entityToVo(entity);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.PROVIDER_FAVOURITE_NOT_FOUND));

        entity.setActive(false);
        providerFavouriteRepository.save(entity);
    }

    @Override
    public List<ProviderFavouriteVo> getByProviderId(Long providerId) {
        return providerFavouriteRepository.findAllByProviderIdAndActive(providerId, true)
                .stream()
                .map(this::enrich)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProviderFavouriteVo> getAll() {
        return providerFavouriteRepository.findAllByActive(true)
                .stream()
                .map(this::enrich)
                .collect(Collectors.toList());
    }

}
