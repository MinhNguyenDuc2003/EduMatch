package com.minh.media.data.mapper;

import com.minh.mapper.BaseMapper;
import com.minh.media.data.entity.MailEntity;
import com.minh.model.dto.media.MailDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED,
        componentModel = "spring",
        uses = {

        })
public interface MailMapper extends BaseMapper<MailEntity, MailDto> {
}
