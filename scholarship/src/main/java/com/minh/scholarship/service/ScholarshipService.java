package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ScholarshipDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ScholarshipService {

    List<ScholarshipDto> getAll();

    ScholarshipDto getById(Long id);

    ScholarshipDto create(ScholarshipDto scholarship, List<MultipartFile> images);

    ScholarshipDto update(ScholarshipDto scholarship, List<MultipartFile> images);

    void delete(Long id);
}
