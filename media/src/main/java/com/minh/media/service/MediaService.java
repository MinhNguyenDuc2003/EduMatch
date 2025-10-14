package com.minh.media.service;

import com.minh.model.dto.media.MediaDto;

import java.util.List;

public interface MediaService {

    MediaDto saveOne(MediaDto mediaDto);

    List<MediaDto> saveAll(List<MediaDto> medias);

    void deleteById(Long id);

    MediaDto getById(Long id);

    List<MediaDto> getByIds(List<Long> ids);

    MediaDto updateOne(MediaDto mediaDto);
}
