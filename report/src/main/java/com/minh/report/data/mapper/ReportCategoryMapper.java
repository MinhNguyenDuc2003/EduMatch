package com.minh.report.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.report.ReportCategoryDto;
import com.minh.report.data.entity.ReportCategoryEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ReportCategoryMapper extends BaseMapper<ReportCategoryEntity, ReportCategoryDto> {

        @Mapping(target = "id", ignore = true)
        void updateEntityFromDto(ReportCategoryDto dto, @MappingTarget ReportCategoryEntity entity);

}
