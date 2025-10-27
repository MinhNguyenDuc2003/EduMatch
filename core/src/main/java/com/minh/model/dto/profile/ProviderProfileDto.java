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
public class ProviderProfileDto extends BaseDto {

    private Long id;

    private String userId;

    private String organizationName;

    private String organizationType;

    private String website;

    private String email;

    private String phone;

    private String logoUrl;

    private String bannerUrl;

    private String addressSummary;

    private String description;

    private Integer yearEstablished;

    private String accreditation;

    private String specialization;

    private Boolean verified;

    private String country;

}
