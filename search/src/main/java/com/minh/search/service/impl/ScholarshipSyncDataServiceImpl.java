package com.minh.search.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.search.data.mapper.ScholarshipMapper;
import com.minh.search.data.repository.ScholarshipRepository;
import com.minh.search.feign.ScholarshipFeign;
import com.minh.search.service.ScholarshipSyncDataService;
import com.minh.service.base.BaseService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ScholarshipSyncDataServiceImpl extends BaseService implements ScholarshipSyncDataService {

    private final ScholarshipFeign scholarshipFeign;
    private final ScholarshipMapper scholarshipMapper;
    private final ScholarshipRepository scholarshipRepository;

    @Override
    public ScholarshipDto getScholarshipById(Long scholarshipId) {
        return this.parseResponse(scholarshipFeign.getById(scholarshipId));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(Long scholarshipId) {
        scholarshipRepository.save(scholarshipMapper.toEntity(this.getScholarshipById(scholarshipId)));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long scholarshipId) {
        ScholarshipDto scholarshipById = this.getScholarshipById(scholarshipId);
        if (ObjectUtils.isNotEmpty(scholarshipById)) {
            scholarshipRepository.deleteById(scholarshipId);
            scholarshipRepository.save(scholarshipMapper.toEntity(scholarshipById));
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long scholarshipId) {
        scholarshipRepository.findById(scholarshipId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.SCHOLARSHIP_IS_NOT_EXIST));
        scholarshipRepository.deleteById(scholarshipId);
    }
}
