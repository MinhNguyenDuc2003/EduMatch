package com.minh.profile.data.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.profile.ProviderFavouriteDto;
import lombok.*;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProviderFavouriteVo extends ProviderFavouriteDto {
    private Long id;
    private String userId;
    private String note;
    private List<ApplicantProfileVo> applicantProfileVo;
}
