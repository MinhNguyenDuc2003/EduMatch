package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.scholarship.ApplicationScholarshipDto;
import com.minh.scholarship.data.entity.ApplicationScholarshipEntity;
import com.minh.scholarship.data.mapper.ApplicationScholarshipMapper;
import com.minh.scholarship.data.repository.ApplicationScholarshipRepository;
import com.minh.scholarship.data.vo.ApplicationScholarshipVo;
import com.minh.scholarship.service.ApplicationScholarshipService;
import com.minh.scholarship.service.ApplicationService;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.base.BaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationScholarshipServiceImpl extends BaseService implements ApplicationScholarshipService {

    private final ApplicationScholarshipRepository repository;
    private final ApplicationScholarshipMapper mapper;
    private final ApplicationScholarshipMapper applicationScholarshipMapper;
    private final ApplicationService applicationService;
    private final ScholarshipService scholarshipService;

    @Override
    public List<ApplicationScholarshipDto> getAll() {
        return mapper.toDto(repository.findAll());
    }

    @Override
    public ApplicationScholarshipVo getById(Long id) {
        ApplicationScholarshipEntity entity = repository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_SCHOLARSHIP_NOT_FOUND));
        ApplicationScholarshipVo vo = mapper.entityToVo(entity);
        vo.setApplicationVo(applicationService.getById(vo.getApplicationId()));
        vo.setScholarshipVo(scholarshipService.getById(vo.getScholarshipId()));
        return vo;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationScholarshipDto create(ApplicationScholarshipDto dto) {
        ApplicationScholarshipEntity saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationScholarshipDto update(ApplicationScholarshipDto dto) {
        repository.findByIdAndActive(dto.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_SCHOLARSHIP_NOT_FOUND));
        ApplicationScholarshipEntity saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.APPLICATION_SCHOLARSHIP_NOT_FOUND);
        }
        repository.updateActiveById(id);
    }

    @Override
    public List<ApplicationScholarshipDto> getAllByApplicationId(Long applicationId) {
        return mapper.toDto(repository.findByApplicationIdAndActive(applicationId, true));
    }

    @Override
    public List<ApplicationScholarshipVo> getAllByScholarshipId(Long scholarshipId) {
        List<ApplicationScholarshipDto> dto = mapper.toDto(repository.findByScholarshipIdAndActive(scholarshipId, true));
        List<ApplicationScholarshipVo> vos = applicationScholarshipMapper.dtoToVos(dto);
        vos.forEach(o -> {
            o.setApplicationVo(applicationService.getById(o.getApplicationId()));
            o.setScholarshipVo(scholarshipService.getById(o.getScholarshipId()));
        });
        return vos;
    }

    @Override
    public List<ApplicationScholarshipDto> getAllByStatus(String status) {
        return mapper.toDto(repository.findByStatusAndActive(status, true));
    }
}