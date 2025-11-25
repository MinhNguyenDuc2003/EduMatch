package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.profile.*;
import com.minh.profile.data.entity.ApplicantProfileEntity;
import com.minh.profile.data.mapper.*;
import com.minh.profile.data.repository.*;
import com.minh.profile.data.vo.ApplicantProfileVo;
import com.minh.profile.service.ApplicantProfileService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicantProfileServiceImpl implements ApplicantProfileService {

    @Autowired
    private ApplicantProfileRepository applicantProfileRepository;
    @Autowired
    private ApplicantCertificateRepository applicantCertificateRepository;
    @Autowired
    private ApplicantEducationHistoryRepository applicantEducationHistoryRepository;
    @Autowired
    private ApplicantPreferenceRepository applicantPreferenceRepository;
    @Autowired
    private ApplicantSkillRepository applicantSkillRepository;
    @Autowired
    private ApplicantEducationIntentionRepository applicantEducationIntentionRepository;

    @Autowired
    private ApplicantProfileMapper applicantProfileMapper;
    @Autowired
    private ApplicantCertificateMapper applicantCertificateMapper;
    @Autowired
    private ApplicantEducationHistoryMapper applicantEducationHistoryMapper;
    @Autowired
    private ApplicantSkillMapper applicantSkillMapper;
    @Autowired
    private ApplicantEducationIntentionMapper applicantEducationIntentionMapper;
    @Autowired
    private ApplicantPreferenceMapper applicantPreferenceMapper;

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicantProfileDto create(ApplicantProfileVo profile) {
        String userId = UaaContextHolder.getUserId();
        profile.setUserId(userId);

        if (applicantProfileRepository.findByUserIdAndActive(userId, true).isPresent()) {
            throw new BusinessException(CoreMessageCode.USER_PROFILE_ALREADY_EXISTED);
        }

        ApplicantProfileEntity savedProfile = applicantProfileRepository.save(applicantProfileMapper.toEntity(profile));

        saveProfileData(profile, savedProfile.getId());
        return applicantProfileMapper.toDto(savedProfile);
    }

    @Override
    public ApplicantProfileVo getOne(Long id) {
        ApplicantProfileVo vo = applicantProfileMapper
                .toVo(applicantProfileRepository
                        .findByIdAndActive(id, true)
                        .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_IS_NOT_EXIST))
                );
        vo.setCertificates(applicantCertificateMapper.toDto(applicantCertificateRepository.findAllByApplicantIdAndActive(id, true)));
        vo.setEducationHistories(applicantEducationHistoryMapper.toDto(applicantEducationHistoryRepository.findAllByApplicantIdAndActive(id, true)));
        vo.setSkills(applicantSkillMapper.toDto(applicantSkillRepository.findAllByApplicantIdAndActive(id, true)));
        vo.setIntentions(applicantEducationIntentionMapper.toDto(applicantEducationIntentionRepository.findAllByApplicantIdAndActive(id, true)));
        return vo;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public ApplicantProfileDto update(ApplicantProfileVo profile) {
        if (ObjectUtils.isEmpty(profile.getId())) {
            throw new BusinessException(CoreMessageCode.APPLICANT_ID_IS_NOT_EXIST);
        }
        ApplicantProfileEntity existProfile = applicantProfileRepository
                .findByIdAndActive(profile.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_IS_NOT_EXIST));

        applicantProfileMapper.updateEntityFromVo(profile, existProfile);
        deleteProfileData(existProfile.getId());
        saveProfileData(profile, existProfile.getId());
        return profile;
    }

    @Override
    public ApplicantProfileVo getOneByUserId(String userId) {
        Optional<ApplicantProfileEntity> profile = applicantProfileRepository.findByUserIdAndActive(userId, true);
        if (profile.isPresent()) {
            ApplicantProfileVo vo = applicantProfileMapper
                    .toVo(profile.get());
            vo.setCertificates(applicantCertificateMapper.toDto(applicantCertificateRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setEducationHistories(applicantEducationHistoryMapper.toDto(applicantEducationHistoryRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setSkills(applicantSkillMapper.toDto(applicantSkillRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setIntentions(applicantEducationIntentionMapper.toDto(applicantEducationIntentionRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setApplicantPreferences(applicantPreferenceMapper.toDto(applicantPreferenceRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            return vo;
        }
        return null;
    }

    @Override
    public List<ApplicantProfileDto> getAll() {
        return applicantProfileMapper.toDto(applicantProfileRepository.getAllByActive(true));
    }

    private void deleteProfileData(Long id) {
        applicantCertificateRepository.updateActiveByApplicantId(id, false);
        applicantEducationHistoryRepository.updateActiveByApplicantId(id, false);
        applicantEducationIntentionRepository.updateActiveByApplicantId(id, false);
        applicantPreferenceRepository.updateActiveByApplicantId(id, false);
        applicantSkillRepository.updateActiveByApplicantId(id, false);
    }

    private void saveProfileData(ApplicantProfileVo profile, Long id) {
        List<ApplicantCertificateDto> certificates = profile.getCertificates();
        if (ObjectUtils.isNotEmpty(certificates)) {
            List<ApplicantCertificateDto> updatedCertificates = certificates.stream()
                    .peek(o -> o.setApplicantId(id))
                    .collect(Collectors.toList());
            applicantCertificateRepository.saveAll(applicantCertificateMapper.toEntity(updatedCertificates));
        }

        List<ApplicantEducationHistoryDto> educationHistories = profile.getEducationHistories();
        if (ObjectUtils.isNotEmpty(educationHistories)) {
            List<ApplicantEducationHistoryDto> updatedEducationHistories = educationHistories.stream()
                    .peek(o -> o.setApplicantId(id))
                    .collect(Collectors.toList());
            applicantEducationHistoryRepository.saveAll(applicantEducationHistoryMapper.toEntity(updatedEducationHistories));
        }

        List<ApplicantPreferenceDto> applicantPreferences = profile.getApplicantPreferences();
        if (ObjectUtils.isNotEmpty(applicantPreferences)) {
            List<ApplicantPreferenceDto> updateApplicantPreference = applicantPreferences.stream()
                    .peek(o -> o.setApplicantId(id))
                    .collect(Collectors.toList());
            applicantPreferenceRepository.saveAll(applicantPreferenceMapper.toEntity(updateApplicantPreference));
        }

        List<ApplicantSkillDto> skills = profile.getSkills();
        if (ObjectUtils.isNotEmpty(skills)) {
            List<ApplicantSkillDto> updatedSkills = skills.stream()
                    .peek(o -> o.setApplicantId(id))
                    .collect(Collectors.toList());
            applicantSkillRepository.saveAll(applicantSkillMapper.toEntity(updatedSkills));
        }

        List<ApplicantEducationIntentionDto> intentions = profile.getIntentions();
        if (ObjectUtils.isNotEmpty(intentions)) {
            List<ApplicantEducationIntentionDto> updatedIntentions = intentions.stream()
                    .peek(o -> o.setApplicantId(id))
                    .collect(Collectors.toList());
            applicantEducationIntentionRepository.saveAll(applicantEducationIntentionMapper.toEntity(updatedIntentions));
        }
    }

}
