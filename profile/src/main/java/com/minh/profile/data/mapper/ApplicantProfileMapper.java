package com.minh.profile.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.profile.data.entity.ApplicantProfileEntity;
import com.minh.profile.data.vo.ApplicantProfileVo;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ApplicantProfileMapper extends BaseMapper<ApplicantProfileEntity, ApplicantProfileDto> {

    @Named("toVo")
    ApplicantProfileVo toVo(ApplicantProfileEntity entity);

    void updateEntityFromVo(ApplicantProfileVo vo, @MappingTarget ApplicantProfileEntity entity);

}
