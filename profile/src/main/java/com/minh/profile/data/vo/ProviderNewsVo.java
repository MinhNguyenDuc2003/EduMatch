package com.minh.profile.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.profile.ProviderNewsDto;
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
public class ProviderNewsVo extends ProviderNewsDto {
    private ProviderProfileVo providerProfileVo;
    private List<MediaDto> newsMedias;
    private ScholarshipVo scholarship;
}
