package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.exception.BusinessException;
import com.minh.model.dto.profile.ApplicantCertificateDto;
import com.minh.model.dto.profile.ApplicantEducationHistoryDto;
import com.minh.model.dto.profile.ApplicantEducationIntentionDto;
import com.minh.model.dto.profile.ApplicantPhoneNumberDto;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.model.dto.profile.ApplicantSkillDto;
import com.minh.profile.data.entity.ApplicantProfileEntity;
import com.minh.profile.data.mapper.ApplicantCertificateMapper;
import com.minh.profile.data.mapper.ApplicantEducationHistoryMapper;
import com.minh.profile.data.mapper.ApplicantEducationIntentionMapper;
import com.minh.profile.data.mapper.ApplicantPhoneNumberMapper;
import com.minh.profile.data.mapper.ApplicantProfileMapper;
import com.minh.profile.data.mapper.ApplicantSkillMapper;
import com.minh.profile.data.repository.ApplicantCertificateRepository;
import com.minh.profile.data.repository.ApplicantEducationHistoryRepository;
import com.minh.profile.data.repository.ApplicantEducationIntentionRepository;
import com.minh.profile.data.repository.ApplicantPhoneNumberRepository;
import com.minh.profile.data.repository.ApplicantProfileRepository;
import com.minh.profile.data.repository.ApplicantSkillRepository;
import com.minh.profile.data.vo.ApplicantProfileVo;
import com.minh.profile.service.ApplicantProfileService;
import com.minh.utils.UaaContextHolder;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicantProfileServiceImpl implements ApplicantProfileService {

    @Autowired
    private ApplicantProfileRepository applicantProfileRepository;
    @Autowired
    private ApplicantCertificateRepository applicantCertificateRepository;
    @Autowired
    private ApplicantEducationHistoryRepository applicantEducationHistoryRepository;
    @Autowired
    private ApplicantPhoneNumberRepository applicantPhoneNumberRepository;
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
    private ApplicantPhoneNumberMapper applicantPhoneNumberMapper;
    @Autowired
    private ApplicantSkillMapper applicantSkillMapper;
    @Autowired
    private ApplicantEducationIntentionMapper applicantEducationIntentionMapper;

    @Override
    @Transactional(rollbackOn =  Exception.class)
    public ApplicantProfileDto create(ApplicantProfileVo profile) {
        String userId = UaaContextHolder.getUserId();
        profile.setUserId(userId);

        if(applicantProfileRepository.findByUserIdAndActive(userId, true).isPresent()){
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
        vo.setPhoneNumbers(applicantPhoneNumberMapper.toDto(applicantPhoneNumberRepository.findAllByApplicantIdAndActive(id, true)));
        vo.setEducationHistories(applicantEducationHistoryMapper.toDto(applicantEducationHistoryRepository.findAllByApplicantIdAndActive(id, true)));
        vo.setSkills(applicantSkillMapper.toDto(applicantSkillRepository.findAllByApplicantIdAndActive(id, true)));
        vo.setIntentions(applicantEducationIntentionMapper.toDto(applicantEducationIntentionRepository.findAllByApplicantIdAndActive(id, true)));
        return vo;
    }

    @Override
    @Transactional(rollbackOn =  Exception.class)
    public ApplicantProfileDto update(ApplicantProfileVo profile) {
        if (ObjectUtils.isEmpty(profile.getId())) {
            throw new BusinessException(CoreMessageCode.APPLICANT_ID_IS_NOT_EXIST);
        }
        ApplicantProfileEntity existProfile = applicantProfileRepository
                .findByIdAndActive(profile.getId(), true)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.APPLICANT_IS_NOT_EXIST));

        profile.setId(existProfile.getId());
        deleteProfileData(profile.getId());
        saveProfileData(profile, profile.getId());
        return profile;
    }

    @Override
    public ApplicantProfileVo getOneByUserId(String userId) {
        Optional<ApplicantProfileEntity> profile = applicantProfileRepository.findByUserIdAndActive(userId, true);
        if (profile.isPresent()) {
            ApplicantProfileVo vo = applicantProfileMapper
                    .toVo(profile.get());
            vo.setCertificates(applicantCertificateMapper.toDto(applicantCertificateRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setPhoneNumbers(applicantPhoneNumberMapper.toDto(applicantPhoneNumberRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setEducationHistories(applicantEducationHistoryMapper.toDto(applicantEducationHistoryRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setSkills(applicantSkillMapper.toDto(applicantSkillRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            vo.setIntentions(applicantEducationIntentionMapper.toDto(applicantEducationIntentionRepository.findAllByApplicantIdAndActive(vo.getId(), true)));
            return vo;
        }
        return null;
    }

    private void deleteProfileData(Long id) {
        applicantCertificateRepository.updateActiveByApplicantId(id, false);
        applicantEducationHistoryRepository.updateActiveByApplicantId(id, false);
        applicantEducationIntentionRepository.updateActiveByApplicantId(id, false);
        applicantPhoneNumberRepository.updateActiveByApplicantId(id, false);
        applicantSkillRepository.updateActiveByApplicantId(id, false);
    }

    private void saveProfileData(ApplicantProfileVo profile, Long id) {
        List<ApplicantCertificateDto> certificates = profile.getCertificates();
        if (ObjectUtils.isNotEmpty(certificates)) {
            List<ApplicantCertificateDto> updatedCertificates = certificates.stream()
                    .peek(o -> o.setApplicantId(id))
                    .toList();
            applicantCertificateRepository.saveAll(applicantCertificateMapper.toEntity(updatedCertificates));
        }

        List<ApplicantEducationHistoryDto> educationHistories = profile.getEducationHistories();
        if (ObjectUtils.isNotEmpty(educationHistories)) {
            List<ApplicantEducationHistoryDto> updatedEducationHistories = educationHistories.stream()
                    .peek(o -> o.setApplicantId(id)).toList();
            applicantEducationHistoryRepository.saveAll(applicantEducationHistoryMapper.toEntity(updatedEducationHistories));
        }

        List<ApplicantPhoneNumberDto> phoneNumbers = profile.getPhoneNumbers();
        if (ObjectUtils.isNotEmpty(phoneNumbers)) {
            List<ApplicantPhoneNumberDto> updatedPhoneNumbers = phoneNumbers.stream()
                    .peek(o -> o.setApplicantId(id)).toList();
            applicantPhoneNumberRepository.saveAll(applicantPhoneNumberMapper.toEntity(updatedPhoneNumbers));
        }

        List<ApplicantSkillDto> skills = profile.getSkills();
        if (ObjectUtils.isNotEmpty(skills)) {
            List<ApplicantSkillDto> updatedSkills = skills.stream()
                    .peek(o -> o.setApplicantId(id)).toList();
            applicantSkillRepository.saveAll(applicantSkillMapper.toEntity(updatedSkills));
        }

        List<ApplicantEducationIntentionDto> intentions = profile.getIntentions();
        if (ObjectUtils.isNotEmpty(intentions)) {
            List<ApplicantEducationIntentionDto> updatedIntentions = intentions.stream()
                    .peek(o -> o.setApplicantId(id)).toList();
            applicantEducationIntentionRepository.saveAll(applicantEducationIntentionMapper.toEntity(updatedIntentions));
        }
    }

}
