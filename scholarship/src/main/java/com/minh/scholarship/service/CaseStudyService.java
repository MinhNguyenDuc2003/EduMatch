package com.minh.scholarship.service;

import com.minh.scholarship.data.entity.CaseStudyEntity;
import com.minh.scholarship.data.vo.CaseStudyVo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CaseStudyService {
    CaseStudyVo create(CaseStudyVo caseStudy, List<MultipartFile> images);

    CaseStudyVo update(CaseStudyVo caseStudy);

    CaseStudyEntity updateVerified(Long id, Boolean verified);

    CaseStudyVo getById(Long id);

    List<CaseStudyVo> getByScholarshipId(Long scholarshipId);

    List<CaseStudyVo> getAll();

}
