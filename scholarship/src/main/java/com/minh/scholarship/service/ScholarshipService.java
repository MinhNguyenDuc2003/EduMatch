package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.model.dto.scholarship.ScholarshipFollowerDto;
import com.minh.model.dto.scholarship.ScholarshipViewDto;
import com.minh.scholarship.data.vo.ScholarshipVo;
import com.minh.scholarship.model.filter.ScholarshipFilter;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ScholarshipService {

    List<ScholarshipDto> getAll();

    ScholarshipVo getById(Long id);

    ScholarshipVo create(ScholarshipVo scholarship, List<MultipartFile> images);

    ScholarshipVo update(ScholarshipVo scholarship);

    void delete(Long id);

    ScholarshipVo getByIdAll(Long id);

    Page<ScholarshipVo> getPage(ScholarshipFilter filter);

    ScholarshipFollowerDto createScholarshipFollower(ScholarshipFollowerDto dto);

    ScholarshipFollowerDto deleteScholarshipFollower(ScholarshipFollowerDto dto);

    List<ScholarshipVo> getMyScholarship();

    List<ScholarshipVo> getScholarshipFollow();

    ScholarshipVo getBySlug(String slug);

    List<ScholarshipVo> getScholarshipByProviderId(Long id);

    List<ScholarshipVo> getByIds(List<Long> ids);

    Boolean addImagesToScholarship(Long id, List<MultipartFile> mediaFiles);

    Boolean deleteImagesToScholarship(Long id, List<Long> mediaIds);

    ScholarshipFollowerDto getScholarshipFollower(Long id);

    List<ScholarshipVo> getByActiveStatus(boolean active);

    Boolean updateScholarshipStatus(Long id, Boolean active);

    List<ScholarshipViewDto> getViewsByScholarshipId(Long id);
}
