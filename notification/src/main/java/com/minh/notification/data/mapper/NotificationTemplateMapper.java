package com.minh.notification.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.model.dto.notification.NotificationTemplateDto;
import com.minh.notification.data.entity.NotificationTemplateEntity;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface NotificationTemplateMapper extends BaseMapper<NotificationTemplateEntity, NotificationTemplateDto> {
}
