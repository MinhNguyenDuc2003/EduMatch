package com.minh.profile.service;

import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.profile.data.vo.ApplicantProfileVo;

public interface ApplicantProfileService {

    ApplicantProfileDto create(ApplicantProfileVo profile);

    ApplicantProfileVo getOne(Long id);

    ApplicantProfileDto update(ApplicantProfileVo profile);

    ApplicantProfileVo getOneByUserId(String userId);

}
