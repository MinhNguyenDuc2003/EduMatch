package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.scholarship.ApplicationReviewDto;
import com.minh.scholarship.data.entity.ApplicationReviewEntity;
import com.minh.scholarship.data.mapper.ApplicationReviewMapper;
import com.minh.scholarship.data.repository.ApplicationReviewRepository;
import com.minh.scholarship.service.ApplicationReviewService;
import com.minh.service.base.BaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationReviewServiceImpl extends BaseService implements ApplicationReviewService {

    private final ApplicationReviewRepository repository;
    private final ApplicationReviewMapper mapper;

    @Override
    public List<ApplicationReviewDto> getAll() {
        return mapper.toDto(repository.findAll());
    }

    @Override
    public ApplicationReviewDto getById(Long id) {
        ApplicationReviewEntity entity = repository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_REVIEW_NOT_FOUND));
        return mapper.toDto(entity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationReviewDto create(ApplicationReviewDto dto) {
        ApplicationReviewEntity savedEntity = repository.save(mapper.toEntity(dto));
        return mapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationReviewDto update(ApplicationReviewDto dto) {
        ApplicationReviewEntity existingEntity = repository.findByIdAndActive(dto.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_REVIEW_NOT_FOUND));

        mapper.updateEntityFromDto(dto, existingEntity);
        ApplicationReviewEntity savedEntity = repository.save(existingEntity);
        return mapper.toDto(savedEntity);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.APPLICATION_REVIEW_NOT_FOUND);
        }
        repository.updateActiveById(id);
    }
}
