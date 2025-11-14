package com.minh.profile.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.profile.ProviderNewsDto;
import com.minh.profile.data.entity.ProviderNewsEntity;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.vo.ProviderNewsVo;
import com.minh.profile.data.vo.ProviderProfileVo;
import org.mapstruct.*;
import java.util.List;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring"
)
public interface ProviderNewsMapper extends BaseMapper<ProviderNewsEntity, ProviderNewsDto> {

        @Named("entityToDto")
        ProviderNewsDto toDto(ProviderNewsEntity entity);

        @IterableMapping(qualifiedByName = "entityToDto")
        List<ProviderNewsDto> toDto(List<ProviderNewsEntity> entities);

        default ProviderNewsDto entityToDto(ProviderNewsEntity entity) {
                return toDto(entity);
        }

        @Named("dtoToEntity")
        ProviderNewsEntity toEntity(ProviderNewsDto dto);

        @IterableMapping(qualifiedByName = "dtoToEntity")
        List<ProviderNewsEntity> toEntity(List<ProviderNewsDto> dtos);

        default ProviderNewsEntity dtoToEntity(ProviderNewsDto dto) {
                return toEntity(dto);
        }

        @Mapping(target = "active", ignore = true)
        void updateEntityFromDto(ProviderNewsDto dto, @MappingTarget ProviderNewsEntity entity);

        // === VO Mapping ===
        ProviderNewsVo entityToVo(ProviderNewsEntity entity);

        List<ProviderNewsVo> entityToVo(List<ProviderNewsEntity> entities);

        void updateEntityFromVo(ProviderNewsVo vo, @MappingTarget ProviderNewsEntity entity);

        ProviderProfileVo providerEntityToVo(ProviderProfileEntity entity);
}
