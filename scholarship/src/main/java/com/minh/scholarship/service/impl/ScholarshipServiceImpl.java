package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.data.mapper.ScholarshipMapper;
import com.minh.scholarship.data.repository.ScholarshipRepository;
import com.minh.scholarship.service.ScholarshipService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl implements ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;
    private final ScholarshipMapper scholarshipMapper;

    @Override
    public List<ScholarshipDto> getAll() {
        return scholarshipMapper.toDto(scholarshipRepository.findAll());
    }

    @Override
    public ScholarshipDto getById(Long id) {
        return scholarshipRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipDto create(ScholarshipDto scholarship) {
        return scholarshipMapper.toDto(scholarshipRepository.save(scholarshipMapper.toEntity(scholarship)));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ScholarshipDto update(ScholarshipDto scholarship) {
        scholarshipRepository.findByIdAndActive(scholarship.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        return scholarshipMapper.toDto(scholarshipRepository.save(scholarshipMapper.toEntity(scholarship)));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!scholarshipRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST);
        }
        scholarshipRepository.updateActiveById(id, false);
    }
}
