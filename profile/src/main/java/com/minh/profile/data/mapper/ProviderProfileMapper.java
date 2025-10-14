package com.minh.profile.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.vo.ProviderProfileVo;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ProviderProfileMapper extends BaseMapper<ProviderProfileEntity, ProviderProfileDto> {

    @Named("toVo")
    ProviderProfileVo toVo(ProviderProfileEntity entity);

    @Named("voToEntity")
    ProviderProfileEntity voToEntity(ProviderProfileVo vo);

}
