package com.minh.profile.service;

import com.minh.enumeration.applicantprofile.ProfileType;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.profile.data.vo.ApplicantProfileVo;

import java.util.List;

public interface ApplicantProfileService {

    ApplicantProfileDto create(ApplicantProfileVo profile);

    ApplicantProfileVo getOne(Long id);

    ApplicantProfileDto update(ApplicantProfileVo profile);

    ApplicantProfileVo getOneByUserId(String userId);

    List<ApplicantProfileDto> getAll();

    List<ApplicantProfileVo> getAllByType(ProfileType type);

    List<ApplicantProfileVo> getAllByUserIdAndType(ProfileType type);

}
