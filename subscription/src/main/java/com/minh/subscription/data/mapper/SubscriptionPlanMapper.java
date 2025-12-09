package com.minh.subscription.data.mapper;

import com.minh.enumeration.subscription.SubscriptionFeatureEnum;
import com.minh.mapper.BaseMapper;
import com.minh.model.dto.subscription.SubscriptionPlanDto;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import org.docx4j.openpackaging.Base;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface SubscriptionPlanMapper extends BaseMapper<SubscriptionPlanEntity, SubscriptionPlanDto> {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SubscriptionPlanDto dto, @MappingTarget SubscriptionPlanEntity entity);

    default List<String> mapEnumListToStringList(List<SubscriptionFeatureEnum> enums) {
        if (enums == null) return null;
        return enums.stream().map(Enum::name).collect(Collectors.toList());
    }

    default List<SubscriptionFeatureEnum> mapStringListToEnumList(List<String> strings) {
        if (strings == null) return null;
        return strings.stream()
                .map(SubscriptionFeatureEnum::valueOf)
                .collect(Collectors.toList());
    }
}
