package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.CaseStudyDto;
import com.minh.scholarship.data.entity.CaseStudyEntity;
import com.minh.scholarship.data.vo.CaseStudyVo;
import org.mapstruct.*;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring"
)
public interface CaseStudyMapper extends BaseMapper<CaseStudyEntity, CaseStudyDto> {

    @Named("entityToVo")
    CaseStudyVo entityToVo(CaseStudyEntity entity);

}
