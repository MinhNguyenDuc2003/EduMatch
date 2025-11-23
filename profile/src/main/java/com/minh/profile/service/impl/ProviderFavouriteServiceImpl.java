package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.profile.ProviderFavouriteDto;
import com.minh.profile.data.entity.ApplicantProfileEntity;
import com.minh.profile.data.entity.ProviderFavouriteEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.mapper.ProviderFavouriteMapper;
import com.minh.profile.data.repository.ApplicantProfileRepository;
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

    private final ProviderFavouriteRepository repository;
    private final ProviderFavouriteMapper mapper;
    private final ApplicantProfileRepository applicantProfileRepository;

    private ProviderFavouriteVo enrich(ProviderFavouriteEntity entity) {
        ProviderFavouriteVo vo = mapper.entityToVo(entity);

        String currentProviderId = UaaContextHolder.getUserId();
        vo.setIsFavourite(
                repository.existsByProviderIdAndUserId(currentProviderId, entity.getUserId()) ? 1 : 0
        );

        Long applicantId = Long.parseLong(entity.getUserId());

        applicantProfileRepository.findByIdAndActive(applicantId, true)
                .ifPresent(applicant ->
                        vo.setApplicantProfileVo(mapper.applicantEntityToVo(applicant))
                );

        return vo;
    }

    @Override
    public List<ProviderFavouriteVo> getMyFavourite() {
        String providerId = UaaContextHolder.getUserId();
        return repository.findAllByProviderIdAndActive(providerId, true)
                .stream()
                .map(this::enrich)
                .collect(Collectors.toList());
    }

    @Override
    public ProviderFavouriteVo getById(Long id) {
        ProviderFavouriteEntity entity = repository.findById(id)
                .orElseThrow(() ->
                        new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND)
                );
        return enrich(entity);
    }

    @Override
    @Transactional
    public ProviderFavouriteDto create(ProviderFavouriteDto dto) {
        String providerId = UaaContextHolder.getUserId();
        dto.setProviderId(providerId);

        if (repository.existsByProviderIdAndUserId(providerId, dto.getUserId())) {
            throw new BusinessException(CoreMessageCode.APPLICANT_ALREADY_ADDED_TO_FAVOURITE);
        }

        ProviderFavouriteEntity entity = mapper.toEntity(dto);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public ProviderFavouriteDto update(ProviderFavouriteDto dto) {
        ProviderFavouriteEntity entity = repository.findById(dto.getId())
                .orElseThrow(() ->
                        new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND)
                );

        mapper.updateEntityFromDto(dto, entity);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ProviderFavouriteEntity entity = repository.findById(id)
                .orElseThrow(() ->
                        new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND)
                );

        entity.setActive(false);
        repository.save(entity);
    }

    @Override
    public List<ProviderFavouriteVo> getByUserId(String userId) {
        return repository.findAllByUserIdAndActive(userId, true)
                .stream()
                .map(this::enrich)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProviderFavouriteVo> getAll() {
        return repository.findAllByActive(true)
                .stream()
                .map(this::enrich)
                .collect(Collectors.toList());
    }
}
