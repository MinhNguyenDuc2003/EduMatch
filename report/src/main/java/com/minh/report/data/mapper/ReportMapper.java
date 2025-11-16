package com.minh.report.data.mapper;
import com.minh.mapper.BaseMapper;
import com.minh.model.dto.report.ReportDto;
import com.minh.report.data.entity.ReportEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {ReportCategoryMapper.class}
)
public interface ReportMapper extends BaseMapper<ReportEntity, ReportDto> {

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(ReportDto dto, @MappingTarget ReportEntity entity);

    @Mapping(target = "response", source = "response")
    ReportDto toDto(ReportEntity entity);

}
