package com.minh.subscription.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.subscription.SubscriptionPlanDto;
import com.minh.subscription.data.entity.SubscriptionEntity;
import com.minh.model.dto.subscription.SubscriptionDto;
import com.minh.subscription.data.entity.SubscriptionPlanEntity;
import com.minh.subscription.data.vo.SubscriptionVo;
import org.mapstruct.*;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface SubscriptionMapper extends BaseMapper<SubscriptionEntity, SubscriptionDto> {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SubscriptionDto dto, @MappingTarget SubscriptionEntity entity);

    SubscriptionPlanDto toDto(SubscriptionPlanEntity planEntity);
    SubscriptionPlanEntity toEntity(SubscriptionPlanDto planDto);

    SubscriptionVo toVo(SubscriptionDto dto);
    List<SubscriptionVo> toVo(List<SubscriptionDto> dtos);

}
