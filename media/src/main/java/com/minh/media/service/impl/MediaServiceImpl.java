package com.minh.media.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.media.data.entity.MediaEntity;
import com.minh.media.data.mapper.MediaMapper;
import com.minh.media.data.repository.MediaRepository;
import com.minh.media.service.MediaService;
import com.minh.media.utils.AmazonS3Util;
import com.minh.media.utils.S3UrlUtil;
import com.minh.model.dto.media.MediaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MediaServiceImpl implements MediaService {

    @Autowired
    private AmazonS3Util amazonS3Util;
    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private MediaMapper mediaMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public MediaDto saveOne(MediaDto mediaDto) {
        ByteArrayInputStream data = new ByteArrayInputStream(mediaDto.getThumbnail());
        String s3Key = amazonS3Util.uploadFile(mediaDto.getFolderName(),
                mediaDto.getFileName(),
                data,
                mediaDto.getIsPublic());
        MediaEntity mediaEntity = mediaMapper.toEntity(mediaDto);
        mediaEntity.setS3Key(s3Key);
        return mediaMapper.toDto(mediaRepository.save(mediaEntity));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<MediaDto> saveAll(List<MediaDto> medias) {
        List<MediaDto> mediaDtos = new ArrayList<>();
        medias.forEach(mediaDto -> {
            mediaDtos.add(saveOne(mediaDto));
        });
        return mediaDtos;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        Optional<MediaEntity> media = mediaRepository.findById(id);
        if (media.isEmpty()) {
            throw new BusinessException(CoreMessageCode.MEDIA_ID_IS_NOT_EXIST);
        }
        mediaRepository.deleteById(id);
        amazonS3Util.deleteFile(media.get().getS3Key());
    }

    @Override
    public MediaDto getById(Long id) {
        Optional<MediaEntity> media = mediaRepository.findById(id);
        if (media.isEmpty()) {
            throw new BusinessException(CoreMessageCode.MEDIA_ID_IS_NOT_EXIST);
        }
        MediaDto dto = mediaMapper.toDto(media.get());
        dto.setUrl(S3UrlUtil.getInstance().getPublicUrl(dto.getS3Key()));
        return dto;
    }

    @Override
    public List<MediaDto> getByIds(List<Long> ids) {
        List<MediaEntity> media = mediaRepository.findAllById(ids);
        if (media.isEmpty()) {
            throw new BusinessException(CoreMessageCode.MEDIA_ID_IS_NOT_EXIST);
        }
        List<MediaDto> dto = mediaMapper.toDto(media);
        for (MediaDto dto1 : dto) {
            dto1.setUrl(S3UrlUtil.getInstance().getPublicUrl(dto1.getS3Key()));
        }
        return dto;
    }

    @Override
    public MediaDto updateOne(MediaDto mediaDto) {
        Optional<MediaEntity> media = mediaRepository.findById(mediaDto.getId());
        if (media.isEmpty()) {
            throw new BusinessException(CoreMessageCode.MEDIA_ID_IS_NOT_EXIST);
        }
        return mediaMapper.toDto(mediaRepository.save(mediaMapper.toEntity(mediaDto)));

    }

}
