package com.minh.subscription.data.mapper;

import com.minh.model.dto.subscription.PaymentDto;
import com.minh.subscription.data.entity.PaymentEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "subscriptionId", source = "subscription.id")
    PaymentDto toDto(PaymentEntity entity);

    @Mapping(target = "subscription.id", source = "subscriptionId")
    PaymentEntity toEntity(PaymentDto dto);

    List<PaymentDto> toDto(List<PaymentEntity> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "subscription.id", source = "subscriptionId")
    void updateEntityFromDto(PaymentDto dto, @MappingTarget PaymentEntity entity);
}
