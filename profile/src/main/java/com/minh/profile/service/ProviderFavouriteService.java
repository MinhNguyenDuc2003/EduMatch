package com.minh.profile.service;

import com.minh.model.dto.profile.ProviderFavouriteDto;
import com.minh.profile.data.vo.ProviderFavouriteVo;
import com.minh.profile.data.vo.ReferralRequestVo;

import java.util.List;

public interface ProviderFavouriteService {

    List<ProviderFavouriteVo> getMyFavourite();

    ProviderFavouriteVo getById(Long id);

    ProviderFavouriteDto create(ProviderFavouriteDto dto);

    ProviderFavouriteDto update(ProviderFavouriteDto dto);

    void delete(Long id);

    Boolean sendOneRefer(String userId, Long scholarshipId);

    Boolean sendAllRefer(ReferralRequestVo referralRequestVo);

}
