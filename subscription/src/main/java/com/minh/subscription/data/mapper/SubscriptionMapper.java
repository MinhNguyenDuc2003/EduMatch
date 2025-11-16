package com.minh.subscription.data.mapper;

import com.minh.model.dto.subscription.SubscriptionPlanDto;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.model.dto.subscription.SubscriptionDto;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import org.mapstruct.*;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface SubscriptionMapper {

    SubscriptionDto toDto(SubscriptionEntity entity);

    List<SubscriptionDto> toDto(List<SubscriptionEntity> entities);

    SubscriptionEntity toEntity(SubscriptionDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SubscriptionDto dto, @MappingTarget SubscriptionEntity entity);

    SubscriptionPlanDto toDto(SubscriptionPlanEntity planEntity);
    SubscriptionPlanEntity toEntity(SubscriptionPlanDto planDto);

}
