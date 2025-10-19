package com.minh.scholarship.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.profile.ProviderContactDto;
import com.minh.model.dto.profile.ProviderProfileDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProviderProfileVo extends ProviderProfileDto {

    List<ProviderContactDto> providerContactDtos;
    private String logoUrl;
    private String bannerUrl;

}
