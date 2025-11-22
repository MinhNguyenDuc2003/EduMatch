package com.minh.profile.data.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.profile.ProviderFavouriteDto;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProviderFavouriteVo extends ProviderFavouriteDto {
    private ApplicantProfileVo applicantProfileVo;
    private int isFavourite;
}
