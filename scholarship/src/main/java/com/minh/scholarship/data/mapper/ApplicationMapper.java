package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.ApplicationDto;
import com.minh.scholarship.data.entity.ApplicationEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ApplicationMapper extends BaseMapper<ApplicationEntity, ApplicationDto> {
        ApplicationDto toDto(ApplicationEntity entity);
        ApplicationEntity toEntity(ApplicationDto dto);

        @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
        void updateEntityFromDto(ApplicationDto dto, @MappingTarget ApplicationEntity entity);
}
