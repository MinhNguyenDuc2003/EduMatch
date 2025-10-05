package com.minh.profile.data.entity;

import com.minh.profile.data.entity.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "profile", name = "APPLICANT_PHONE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicantPhoneNumberEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "APPLICANT_ID")
    private Long applicantId;

    @Column(name = "PHONE_TYPE", length = 20, nullable = false)
    private String phoneType;

    @Column(name = "COUNTRY_CODE", length = 10)
    private String countryCode;

    @Column(name = "PHONE_NUMBER", length = 30, nullable = false)
    private String phoneNumber;

    @Column(name = "IS_INTERNATIONAL", nullable = false)
    private Boolean isInternational = false;

}
