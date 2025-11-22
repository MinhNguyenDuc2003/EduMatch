package com.minh.profile.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.profile.ProviderFavouriteDto;
import com.minh.profile.data.entity.ApplicantProfileEntity;
import com.minh.profile.data.entity.ProviderFavouriteEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.vo.ApplicantProfileVo;
import com.minh.profile.data.vo.ProviderFavouriteVo;
import com.minh.profile.data.vo.ProviderProfileVo;
import org.mapstruct.*;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring"
)
public interface ProviderFavouriteMapper extends BaseMapper<ProviderFavouriteEntity, ProviderFavouriteDto> {

    ProviderFavouriteVo entityToVo(ProviderFavouriteEntity entity);

    void updateEntityFromDto(ProviderFavouriteDto dto, @MappingTarget ProviderFavouriteEntity entity);

    ApplicantProfileVo applicantEntityToVo(ApplicantProfileEntity entity);
}
