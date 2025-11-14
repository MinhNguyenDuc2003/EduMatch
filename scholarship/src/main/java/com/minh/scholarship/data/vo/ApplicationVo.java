package com.minh.scholarship.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.scholarship.ApplicationAttributeDto;
import com.minh.model.dto.scholarship.ApplicationDto;
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
public class ApplicationVo extends ApplicationDto {

    private List<MediaDto> applicationMedias;
    private List<ApplicationAttributeDto> applicationAttributes;

}
