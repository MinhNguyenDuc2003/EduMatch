package com.minh.search.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.search.data.entity.ScholarshipEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ScholarshipMapper extends BaseMapper<ScholarshipEntity, ScholarshipDto> {
}
