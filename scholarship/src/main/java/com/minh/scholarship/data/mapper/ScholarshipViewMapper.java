package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.ScholarshipViewDto;
import com.minh.scholarship.data.entity.ScholarshipViewEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ScholarshipViewMapper extends BaseMapper<ScholarshipViewEntity, ScholarshipViewDto> {
}
