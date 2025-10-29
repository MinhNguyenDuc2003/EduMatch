package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.scholarship.data.entity.ApplicationReviewEntity;
import com.minh.model.dto.scholarship.ApplicationReviewDto;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ApplicationReviewMapper extends BaseMapper<ApplicationReviewEntity, ApplicationReviewDto> {
}
