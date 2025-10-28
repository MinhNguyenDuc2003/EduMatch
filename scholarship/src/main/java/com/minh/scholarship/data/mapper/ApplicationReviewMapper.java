package com.minh.scholarship.data.mapper;

import com.minh.scholarship.data.entity.ApplicationReviewEntity;
import com.minh.model.dto.scholarship.ApplicationReviewDto;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ApplicationReviewMapper {

    ApplicationReviewDto toDto(ApplicationReviewEntity entity);

    ApplicationReviewEntity toEntity(ApplicationReviewDto dto);

    List<ApplicationReviewDto> toDto(List<ApplicationReviewEntity> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ApplicationReviewDto dto, @MappingTarget ApplicationReviewEntity entity);
}
