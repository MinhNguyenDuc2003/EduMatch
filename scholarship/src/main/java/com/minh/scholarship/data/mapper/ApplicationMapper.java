package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.ApplicationAttributeDto;
import com.minh.model.dto.scholarship.ApplicationDto;
import com.minh.scholarship.data.entity.ApplicationAttributeEntity;
import com.minh.scholarship.data.entity.ApplicationEntity;
import com.minh.scholarship.data.vo.ApplicationVo;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring"
)
public interface ApplicationMapper extends BaseMapper<ApplicationEntity, ApplicationDto> {

        @Named("entityToVo")
        ApplicationVo entityToVo(ApplicationEntity entity);

        void updateEntityFromVo(ApplicationVo applicationVo, @MappingTarget ApplicationEntity entity);

        @Named("voToEntity")
        ApplicationEntity voToEntity(ApplicationVo vo);

        // ---------------- ATTRIBUTE MAPPING ----------------

        @Named("toAttributeDto")
        ApplicationAttributeDto toAttributeDto(ApplicationAttributeEntity entity);

        @Named("toAttributeEntity")
        default List<ApplicationAttributeEntity> toAttributeEntity(List<ApplicationAttributeDto> dtos) {
                if (dtos == null) {
                        return null;
                }
                return dtos.stream().map(dto -> ApplicationAttributeEntity.builder()
                        .key(dto.getKey())
                        .value(dto.getValue())
                        .note(dto.getNote())
                        .build()
                ).collect(Collectors.toList());
        }
}
