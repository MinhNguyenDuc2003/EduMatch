package com.minh.model.dto.profile;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProviderFavouriteDto extends BaseDto {

    private Long id;

    private String providerId;

    private String userId;

    private String note;
}
