package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ApplicationDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApplicationService {
    List<ApplicationDto> getAll();

    ApplicationDto getById(Long id);

    ApplicationDto create(ApplicationDto application);

    ApplicationDto update(ApplicationDto application);

    void delete(Long id);
}
