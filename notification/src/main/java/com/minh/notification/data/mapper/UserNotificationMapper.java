package com.minh.notification.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.notification.UserNotificationDto;
import com.minh.notification.data.entity.UserNotificationEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface UserNotificationMapper extends BaseMapper<UserNotificationEntity, UserNotificationDto> {
}
