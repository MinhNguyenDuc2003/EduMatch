package com.minh.media.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.media.data.entity.MailTemplateEntity;
import com.minh.model.dto.media.MailTemplateDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface MailTemplateMapper extends BaseMapper<MailTemplateEntity, MailTemplateDto> {
}
