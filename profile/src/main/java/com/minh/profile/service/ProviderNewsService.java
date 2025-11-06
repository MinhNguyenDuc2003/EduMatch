package com.minh.profile.service;

import com.minh.model.dto.profile.ProviderNewsDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProviderNewsService {

    List<ProviderNewsDto> getAll();

    ProviderNewsDto getById(Long id);

    ProviderNewsDto create(ProviderNewsDto dto, List<MultipartFile> images);

    ProviderNewsDto update(Long id, ProviderNewsDto dto);

    void delete(Long id);

    Boolean addImagesToNews(Long id, List<MultipartFile> mediaFiles);

    Boolean deleteImagesToNews(Long id, List<Long> mediaIds);
}
