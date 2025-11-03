package com.minh.scholarship.service;

import com.minh.model.dto.scholarship.ApplicationDto;
import com.minh.scholarship.data.vo.ApplicationVo;
import com.minh.scholarship.model.filter.ApplicationFilter;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApplicationService {

    List<ApplicationVo> getAll();

    ApplicationVo getById(Long id);

    Page<ApplicationVo> getPage(ApplicationFilter filter);

    ApplicationVo create(ApplicationVo applicationVo,
                         List<MultipartFile> mediaFiles,
                         String attributesJson);

    ApplicationVo update(Long id,
                         ApplicationVo applicationVo,
                         List<MultipartFile> mediaFiles,
                         String attributesJson);

    void delete(Long id);
}
