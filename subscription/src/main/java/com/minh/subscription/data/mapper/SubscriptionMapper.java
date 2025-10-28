package com.minh.subscription.data.mapper;

import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.model.dto.subscription.SubscriptionDto;
import org.mapstruct.*;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {

    SubscriptionDto toDto(SubscriptionEntity entity);

    List<SubscriptionDto> toDto(List<SubscriptionEntity> entities);

    SubscriptionEntity toEntity(SubscriptionDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SubscriptionDto dto, @MappingTarget SubscriptionEntity entity);
}
