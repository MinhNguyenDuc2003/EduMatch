package com.minh.subscription.data.mapper;

import com.minh.model.dto.subscription.OrderDto;
import com.minh.subscription.data.entity.OrderEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "subscriptionId", source = "subscription.id")
    OrderDto toDto(OrderEntity entity);

    @Mapping(target = "subscription.id", source = "subscriptionId")
    OrderEntity toEntity(OrderDto dto);

    List<OrderDto> toDto(List<OrderEntity> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "subscription.id", source = "subscriptionId")
    void updateEntityFromDto(OrderDto dto, @MappingTarget OrderEntity entity);
}
