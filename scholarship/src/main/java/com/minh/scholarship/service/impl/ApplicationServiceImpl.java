package com.minh.scholarship.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.scholarship.ApplicationDto;
import com.minh.scholarship.data.entity.ApplicationEntity;
import com.minh.scholarship.data.entity.junction.ApplicationMediaEntity;
import com.minh.scholarship.data.mapper.ApplicationMapper;
import com.minh.scholarship.data.repository.ApplicationMediaRepository;
import com.minh.scholarship.data.repository.ApplicationRepository;
import com.minh.scholarship.feign.MediaFeign;
import com.minh.scholarship.service.ApplicationService;
import com.minh.service.base.BaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl extends BaseService implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;
    private final ApplicationMediaRepository applicationMediaRepository;
    private final MediaFeign mediaFeign;

    @Override
    public List<ApplicationDto> getAll() {
        return applicationMapper.toDto(applicationRepository.findAll());
    }

    @Override
    public ApplicationDto getById(Long id) {
        ApplicationEntity entity = applicationRepository.findByIdAndActive(id, true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST));
        return applicationMapper.toDto(entity);
    }

    /*@Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationDto create(ApplicationDto application, List<MultipartFile> documents) {
        ApplicationEntity savedApp = applicationRepository.save(applicationMapper.toEntity(application));
        if (ObjectUtils.isNotEmpty(documents)) {
            uploadDocuments(application, documents, savedApp.getId());
        }
        return applicationMapper.toDto(savedApp);
    }*/

    public ApplicationDto create(ApplicationDto application) {
        ApplicationEntity savedEntity = applicationRepository.save(applicationMapper.toEntity(application));
        return applicationMapper.toDto(savedEntity);
    }

//    @Override
//    @Transactional(rollbackOn = Exception.class)
//    public ApplicationDto update(ApplicationDto application, List<MultipartFile> documents) {
//        applicationRepository.findByIdAndActive(application.getId(), true)
//                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST));
//
//        if (ObjectUtils.isNotEmpty(documents)) {
//            applicationMediaRepository.deleteAllByApplicationId(application.getId());
//            uploadDocuments(application, documents, application.getId());
//        }
//        return applicationMapper.toDto(applicationRepository.save(applicationMapper.toEntity(application)));
//    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicationDto update(ApplicationDto application) {
        ApplicationEntity existingEntity = applicationRepository.findByIdAndActive(application.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST));

        applicationMapper.updateEntityFromDto(application, existingEntity);

        ApplicationEntity savedEntity = applicationRepository.save(existingEntity);

        return applicationMapper.toDto(savedEntity);
    }

    private void uploadDocuments(ApplicationDto application, List<MultipartFile> documents, Long id) {
        documents.forEach(file -> {
            MediaDto request = new MediaDto();
            request.setFileName(file.getOriginalFilename());
            request.setSize(file.getSize());
            request.setContentType(file.getContentType());
            try {
                request.setThumbnail(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            request.setIsPublic(false);
            request.setFolderName("application/" + application.getId());
            MediaDto mediaDto = this.parseResponse(mediaFeign.create(request));

            ApplicationMediaEntity entity = new ApplicationMediaEntity();
            entity.setApplicationId(id);
            entity.setMediaId(mediaDto.getId());
            applicationMediaRepository.save(entity);
        });
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void delete(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new BusinessException(CoreMessageCode.APPLICATION_IS_NOT_EXIST);
        }
        applicationRepository.updateActiveById(id, false);
    }
}