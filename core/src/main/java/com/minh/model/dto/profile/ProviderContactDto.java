package com.minh.model.dto.profile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class ProviderContactDto extends BaseDto {

    private Long id;

    private Long providerId;

    private String contactName;

    private String roleTitle;

    private String email;

    private String phone;

    private String linkedinUrl;

}
