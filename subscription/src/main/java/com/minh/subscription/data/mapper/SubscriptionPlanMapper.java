package com.minh.subscription.data.mapper;

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
}
