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

    private final ProviderFavouriteRepository providerFavouriteRepository;
    private final ApplicantProfileRepository applicantProfileRepository;
    private final ProviderFavouriteMapper providerFavouriteMapper;

    private ProviderFavouriteVo enrich(ProviderFavouriteEntity entity) {
        ProviderFavouriteVo vo = providerFavouriteMapper.entityToVo(entity);

        ApplicantProfileEntity applicant =
                applicantProfileRepository.findById(entity.getApplicantId()).orElse(null);

        if (applicant != null) {
            vo.setApplicantProfileVo(providerFavouriteMapper.applicantEntityToVo(applicant));
        }

        String currentUserId = UaaContextHolder.getUserId();

        boolean favourite =
                providerFavouriteRepository.existsByUserIdAndApplicantId(currentUserId, entity.getApplicantId());

        vo.setIsFavourite(favourite ? 1 : 0);

        return vo;
    }

    @Override
    public List<ProviderFavouriteVo> getMyFavourite() {
        String userId = UaaContextHolder.getUserId();

        return providerFavouriteRepository.findAllByUserIdAndActive(userId, true)
                .stream()
                .map(this::enrich)
                .collect(Collectors.toList());
    }

    @Override
    public ProviderFavouriteVo getById(Long id) {
        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND));
        return enrich(entity);
    }

    @Override
    @Transactional
    public ProviderFavouriteDto create(ProviderFavouriteDto dto) {

        String userId = UaaContextHolder.getUserId();
        dto.setUserId(userId);

        if (providerFavouriteRepository.existsByUserIdAndApplicantId(userId, dto.getApplicantId())) {
            throw new BusinessException(CoreMessageCode.APPLICANT_ALREADY_ADDED_TO_FAVOURITE);
        }

        if (!applicantProfileRepository.existsById(dto.getApplicantId())) {
            throw new BusinessException(CoreMessageCode.APPLICANT_NOT_FOUND);
        }

        ProviderFavouriteEntity entity = providerFavouriteMapper.toEntity(dto);
        providerFavouriteRepository.save(entity);

        return providerFavouriteMapper.entityToVo(entity);
    }

    @Override
    @Transactional
    public ProviderFavouriteDto update(ProviderFavouriteDto dto) {

        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(dto.getId())
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND));


        Long applicantId = dto.getApplicantId();

        if (!applicantProfileRepository.existsById(applicantId)) {
            throw new BusinessException(CoreMessageCode.APPLICANT_NOT_FOUND);
        }

        providerFavouriteMapper.updateEntityFromDto(dto, entity);
        providerFavouriteRepository.save(entity);

        return providerFavouriteMapper.entityToVo(entity);
    }


    @Override
    @Transactional
    public void delete(Long id) {
        ProviderFavouriteEntity entity = providerFavouriteRepository.findById(id)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_FAVOURITE_NOT_FOUND));

        entity.setActive(false);
        providerFavouriteRepository.save(entity);
    }

    @Override
    public List<ProviderFavouriteVo> getByApplicantId(Long applicantId) {

        if (!applicantProfileRepository.existsById(applicantId)) {
            throw new BusinessException(CoreMessageCode.APPLICANT_NOT_FOUND);
        }

        return providerFavouriteRepository.findAllByApplicantIdAndActive(applicantId, true)
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
