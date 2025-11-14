package com.minh.profile.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.profile.data.entity.ProviderProfileEntity;
import com.minh.profile.data.vo.ProviderProfileVo;
import com.minh.profile.data.vo.projection.ProviderProfileProjection;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ProviderProfileMapper extends BaseMapper<ProviderProfileEntity, ProviderProfileDto> {

    @Named("toVo")
    ProviderProfileVo toVo(ProviderProfileEntity entity);

    @Named("voToEntity")
    ProviderProfileEntity voToEntity(ProviderProfileVo vo);

    void updateEntityFromVo(ProviderProfileVo vo, @MappingTarget ProviderProfileEntity entity);

    @Named("proToVo")
    ProviderProfileVo proToVo(ProviderProfileProjection projection);

    @IterableMapping(qualifiedByName = "proToVo")
    @Named("prosToVos")
    List<ProviderProfileVo> prosToVos(List<ProviderProfileProjection> projection);

}
