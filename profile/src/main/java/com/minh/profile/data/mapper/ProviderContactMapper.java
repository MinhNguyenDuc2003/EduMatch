package com.minh.profile.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.profile.ApplicantSkillDto;
import com.minh.model.dto.profile.ProviderContactDto;
import com.minh.profile.data.entity.ApplicantSkillEntity;
import com.minh.profile.data.entity.ProviderContactEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ProviderContactMapper extends BaseMapper<ProviderContactEntity, ProviderContactDto> {
}
