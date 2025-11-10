package com.minh.subscription.data.mapper;

import com.minh.model.dto.subscription.OrderDto;
import com.minh.subscription.data.entity.PaymentEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(target = "subscriptionId", source = "subscription.id")
    OrderDto toDto(PaymentEntity entity);

    @Mapping(target = "subscription.id", source = "subscriptionId")
    PaymentEntity toEntity(OrderDto dto);

    List<OrderDto> toDto(List<PaymentEntity> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "subscription.id", source = "subscriptionId")
    void updateEntityFromDto(OrderDto dto, @MappingTarget PaymentEntity entity);
}
