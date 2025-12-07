package com.minh.scholarship.data.vo.projection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public interface ScholarshipProjection {

    Long getId();

    Long getProviderId();

    String getTitle();

    String getSlug();

    String getShortDescription();

    String getDescription();

    String getRequirements();

    String getBenefits();

    String getFields();

    String getCountry();

    String getUniversity();

    String getStudyLevel();

    String getScholarshipType();

    String getFundingAmount();

    LocalDateTime getStartDate();

    LocalDateTime getEndDate();

    Integer getAvailableSlots();

    String getLanguageRequirement();

    Double getGpaRequirement();

    Boolean getIsDeleted();

    Integer getIsFollow();

    String getRequiredMajor();

    String getRestrictedNationalities();

    Integer getMinAge();

    Integer getMaxAge();

    String getGenderRequirement();

    Integer getRequiredSatScore();

    Integer getRequiredActScore();

    Integer getRequiredGreScore();

    Integer getRequiredGmatScore();

    Integer getRequiredToeflScore();

    Double getRequiredIeltsScore();

    Integer getRequiredWorkExperienceYears();

    Integer getRequiredPublicationCount();

    String getRequiredAcademicAwards();

    Integer getRequiredClassRankPercentile();

}
