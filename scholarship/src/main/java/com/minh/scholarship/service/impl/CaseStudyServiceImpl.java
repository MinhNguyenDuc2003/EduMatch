package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.scholarship.data.entity.CaseStudyEntity;
import com.minh.scholarship.data.entity.CaseStudyMediaEntity;
import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.mapper.CaseStudyMapper;
import com.minh.scholarship.data.repository.CaseStudyMediaRepository;
import com.minh.scholarship.data.repository.CaseStudyRepository;
import com.minh.scholarship.data.repository.ScholarshipRepository;
import com.minh.scholarship.data.vo.CaseStudyVo;
import com.minh.scholarship.feign.MediaFeign;
import com.minh.scholarship.service.CaseStudyService;
import com.minh.service.base.BaseService;
import com.minh.utils.UaaContextHolder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CaseStudyServiceImpl extends BaseService implements CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;
    private final CaseStudyMediaRepository caseStudyMediaRepository;
    private final CaseStudyMapper caseStudyMapper;
    private final MediaFeign mediaFeign;
    private final ScholarshipRepository scholarshipRepository;

    @Override
    public CaseStudyVo create(CaseStudyVo caseStudy, List<MultipartFile> images) {
        List<ScholarshipEntity> scholarshipEntity = scholarshipRepository.findByApplicationSuccessAndScholarshipId(UaaContextHolder.getUserId(), caseStudy.getScholarshipId(), "Successful");
        if (ObjectUtils.isNotEmpty(scholarshipEntity)) {
            throw new BusinessException(CoreMessageCode.USER_IS_NOT_SUCCESSFULLY_GAIN_SCHOLARSHIP);
        }
        CaseStudyEntity save = caseStudyRepository.save(caseStudyMapper.toEntity(caseStudy));
        uploadImages(images, save.getId());
        return caseStudy;
    }

    @Override
    public CaseStudyVo update(CaseStudyVo caseStudy) {
        Optional<CaseStudyEntity> caseStudyEntity = caseStudyRepository.findById(caseStudy.getId());
        if (caseStudyEntity.isEmpty()) {
            throw new BusinessException(CoreMessageCode.CASE_STUDY_IS_NOT_FOUND);
        }
        caseStudyRepository.save(caseStudyMapper.toEntity(caseStudy));
        return caseStudy;
    }

    @Override
    public CaseStudyEntity updateVerified(Long id, Boolean verified) {
        Optional<CaseStudyEntity> caseStudyEntity = caseStudyRepository.findById(id);
        if (caseStudyEntity.isEmpty()) {
            throw new BusinessException(CoreMessageCode.CASE_STUDY_IS_NOT_FOUND);
        }
        CaseStudyEntity caseStudyEntity1 = caseStudyEntity.get();
        caseStudyEntity1.setVerified(verified);
        return caseStudyRepository.save(caseStudyEntity1);
    }

    private void uploadImages(List<MultipartFile> images, Long id) {
        images.forEach(image -> {
            MediaDto request = new MediaDto();
            request.setFileName(image.getOriginalFilename());
            request.setSize(image.getSize());
            request.setContentType(image.getContentType());
            try {
                request.setThumbnail(image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            request.setIsPublic(true);
            request.setFolderName("case-study/" + id);
            MediaDto mediaDto = this.parseResponse(mediaFeign.create(request));

            CaseStudyMediaEntity entity = new CaseStudyMediaEntity();
            entity.setCaseStudyId(id);
            entity.setMediaId(mediaDto.getId());
            caseStudyMediaRepository.save(entity);
        });
    }

}
