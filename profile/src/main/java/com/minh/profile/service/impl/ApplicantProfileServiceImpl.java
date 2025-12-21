package com.minh.profile.service.impl;

import com.minh.constants.CoreMessageCode;
import com.minh.enumeration.applicantprofile.ProfileType;
import com.minh.exception.BusinessException;
import com.minh.model.dto.profile.*;
import com.minh.model.dto.scholarship.ScholarshipDto;
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

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ApplicantProfileServiceImpl implements ApplicantProfileService {

    @Autowired
    private ApplicantProfileRepository applicantProfileRepository;
    @Autowired
    private ProviderProfileRepository providerProfileRepository;
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

        if ("Current".equals(profile.getType()) && applicantProfileRepository.findByUserIdAndActiveAndType(userId, true, ProfileType.CURRENT.getValue()).isPresent()) {
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
        Optional<ApplicantProfileEntity> profile = applicantProfileRepository.findByUserIdAndActiveAndType(userId, true, ProfileType.CURRENT.getValue());
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
        return applicantProfileMapper.toDto(
                applicantProfileRepository.findAllCurrentProfiles()
        );
    }

    @Override
    public List<ApplicantProfileVo> getByScholarshipFilter(ScholarshipDto scholarshipDto) {
        List<String> nationalities = new ArrayList<>();
        if (ObjectUtils.isNotEmpty(scholarshipDto.getRestrictedNationalities())) {
            nationalities = Arrays.stream(scholarshipDto.getRestrictedNationalities().split(",")).toList();
        }
        List<ApplicantProfileEntity> profileEntities = applicantProfileRepository.getByScholarshipFilter(
                scholarshipDto.getStudyLevel(), nationalities,
                scholarshipDto.getGpaRequirement(), scholarshipDto.getRequiredSatScore(),
                scholarshipDto.getRequiredGreScore(), scholarshipDto.getRequiredActScore(),
                scholarshipDto.getRequiredGmatScore(), scholarshipDto.getRequiredToeflScore(),
                scholarshipDto.getRequiredIeltsScore()
        );
        List<ApplicantProfileVo> vos = new ArrayList<>();
        for (ApplicantProfileEntity profileEntity : profileEntities) {
            vos.add(this.getOne(profileEntity.getId()));
        }
        return vos;
    }

    @Override
    public List<ApplicantPreferenceDto> getPreferencesById(Long id) {
        return applicantPreferenceMapper.toDto(applicantPreferenceRepository.findAllByApplicantIdAndActive(id, true));
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

    @Override
    public List<ApplicantProfileVo> getAllByType(String type) {

        List<ApplicantProfileEntity> list =
                applicantProfileRepository.findAllByTypeAndActive(type, true);

        return list.stream()
                .map(entity -> applicantProfileMapper.toVo(entity))
                .toList();
    }

    @Override
    public List<ApplicantProfileVo> getAllByUserIdAndType(String type) {

        String userId = UaaContextHolder.getUserId();
        List<ApplicantProfileEntity> list =
                applicantProfileRepository.findAllByUserIdAndTypeAndActive(userId, type, true);

        return list.stream()
                .map(entity -> applicantProfileMapper.toVo(entity))
                .toList();
    }

    private String normalize(String country) {
        if (country == null) return null;

        return country
                .trim()
                .toLowerCase()
                .replaceAll("\\s+", "");
    }

    @Override
    public List<CountryRegisterStatisticDto> getTop5CountryRegister() {

        List<CountryRegisterStatisticDto> applicantStats =
                applicantProfileRepository.countByCountry()
                        .stream()
                        .map(o -> new CountryRegisterStatisticDto(
                                normalize(o.getCountry()),
                                o.getTotal()
                        ))
                        .toList();

        List<CountryRegisterStatisticDto> providerStats =
                providerProfileRepository.countByCountry()
                        .stream()
                        .map(o -> new CountryRegisterStatisticDto(
                                normalize(o.getCountry()),
                                o.getTotal()
                        ))
                        .toList();

        return Stream.concat(applicantStats.stream(), providerStats.stream())
                .filter(o -> o.getCountry() != null)
                .collect(Collectors.groupingBy(
                        CountryRegisterStatisticDto::getCountry,
                        Collectors.summingLong(CountryRegisterStatisticDto::getTotal)
                ))
                .entrySet()
                .stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(e -> new CountryRegisterStatisticDto(e.getKey(), e.getValue()))
                .toList();
    }

    @Override
    public Double getTotalWeightByProfileId(Long profileId) {
        return applicantProfileRepository.getTotalWeightByProfileId(profileId);
    }

    @Override
    public List<ApplicantProfileVo> getAllMyProfile(String userId) {
        List<ApplicantProfileEntity> list =
                applicantProfileRepository.findAllByUserIdAndActive(userId, true);
        List<ApplicantProfileVo> applicantProfileVos = new ArrayList<>();
        list.forEach(o -> {
            applicantProfileVos.add(this.getOne(o.getId()));
        });
        return applicantProfileVos;
    }

}
