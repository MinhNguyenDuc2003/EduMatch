package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.ApplicationScholarshipDto;
import com.minh.scholarship.data.entity.ApplicationScholarshipEntity;
import com.minh.scholarship.data.vo.ApplicationScholarshipVo;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring"
)
public interface ApplicationScholarshipMapper extends BaseMapper<ApplicationScholarshipEntity, ApplicationScholarshipDto> {

    @Named("dtoToVo")
    ApplicationScholarshipVo dtoToVo(ApplicationScholarshipDto dto);

    @IterableMapping(qualifiedByName = "dtoToVo")
    @Named("dtoToVos")
    List<ApplicationScholarshipVo> dtoToVos(List<ApplicationScholarshipDto> projection);

    @Named("entityToVo")
    ApplicationScholarshipVo entityToVo(ApplicationScholarshipEntity entity);
}