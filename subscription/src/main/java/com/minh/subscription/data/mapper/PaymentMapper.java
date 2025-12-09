package com.minh.subscription.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.subscription.PaymentDto;
import com.minh.subscription.data.entity.PaymentEntity;
import com.minh.subscription.data.vo.PaymentVo;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface PaymentMapper extends BaseMapper<PaymentEntity, PaymentDto> {

    @Mapping(target = "subscriptionId", source = "subscription.id")
    PaymentDto toDto(PaymentEntity entity);

    @Mapping(target = "subscription.id", source = "subscriptionId")
    PaymentEntity toEntity(PaymentDto dto);

    List<PaymentDto> toDto(List<PaymentEntity> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "subscription.id", source = "subscriptionId")
    void updateEntityFromDto(PaymentDto dto, @MappingTarget PaymentEntity entity);

    @Mapping(target = "customer", ignore = true)
    PaymentVo toVo(PaymentEntity entity);

    List<PaymentVo> toVo(List<PaymentEntity> entities);
}
