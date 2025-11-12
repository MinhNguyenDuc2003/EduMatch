package com.minh.subscription.data.mapper;

import com.minh.enumeration.subscription.SubscriptionFeatureEnum;
import com.minh.model.dto.subscription.SubscriptionPlanDto;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubscriptionPlanMapper {

    SubscriptionPlanDto toDto(SubscriptionPlanEntity entity);

    SubscriptionPlanEntity toEntity(SubscriptionPlanDto dto);

    List<SubscriptionPlanDto> toDto(List<SubscriptionPlanEntity> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SubscriptionPlanDto dto, @MappingTarget SubscriptionPlanEntity entity);

    // Entity -> DTO
    default List<String> mapFeaturesToDto(List<SubscriptionFeatureEnum> features) {
        if (features == null) return List.of();
        return features.stream().map(Enum::name).toList();
    }

    // DTO -> Entity
    default List<SubscriptionFeatureEnum> mapFeaturesToEntity(List<String> features) {
        if (features == null) return List.of();
        return features.stream()
                .map(SubscriptionFeatureEnum::valueOf) // convert String -> enum
                .toList();
    }
}
