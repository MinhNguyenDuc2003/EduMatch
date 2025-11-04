package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.ApplicationScholarshipDto;
import com.minh.scholarship.data.entity.ApplicationScholarshipEntity;
import org.mapstruct.*;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring"
)
public interface ApplicationScholarshipMapper extends BaseMapper<ApplicationScholarshipEntity, ApplicationScholarshipDto> {
}