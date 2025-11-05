package com.minh.scholarship.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.vo.ScholarshipVo;
import com.minh.scholarship.data.vo.projection.ScholarshipProjection;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface ScholarshipMapper extends BaseMapper<ScholarshipEntity, ScholarshipDto> {

    @Named("entityToVo")
    ScholarshipVo entityToVo(ScholarshipEntity entity);

    void updateEntityFromVo(ScholarshipVo scholarship, @MappingTarget ScholarshipEntity entity);

    @Named("proToVo")
    ScholarshipVo proToVo(ScholarshipProjection projection);

    @IterableMapping(qualifiedByName = "proToVo")
    @Named("prosToVos")
    List<ScholarshipVo> prosToVos(List<ScholarshipProjection> projection);

}
