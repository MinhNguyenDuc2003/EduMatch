package com.minh.profile.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.profile.ProviderNewsDto;
import com.minh.profile.data.entity.ProviderNewsEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ProviderNewsMapper extends BaseMapper<ProviderNewsEntity, ProviderNewsDto> {
}
