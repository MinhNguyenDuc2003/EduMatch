package com.minh.subscription.data.mapper;

import com.minh.enumeration.subscription.SubscriptionFeatureEnum;
import com.minh.model.dto.subscription.SubscriptionPlanDto;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SubscriptionPlanMapper {

    SubscriptionPlanDto toDto(SubscriptionPlanEntity entity);

    SubscriptionPlanEntity toEntity(SubscriptionPlanDto dto);

    List<SubscriptionPlanDto> toDto(List<SubscriptionPlanEntity> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SubscriptionPlanDto dto, @MappingTarget SubscriptionPlanEntity entity);

    // === Thêm 2 method hỗ trợ chuyển đổi ===
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
