package com.minh.profile.data.vo.projection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface ProviderProfileProjection {

    Long getId();

    String getUserId();

    String getOrganizationName();

    String getOrganizationType();

    String getWebsite();

    String getEmail();

    String getPhone();

    String getLogoUrl();

    String getBannerUrl();

    String getAddressSummary();

    String getDescription();

    Integer getYearEstablished();

    String getAccreditation();

    String getSpecialization();

    Boolean getVerified();

    String getCountry();

    Integer getIsFollow();

}
