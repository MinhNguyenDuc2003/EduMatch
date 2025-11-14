package com.minh.profile.data.entity;

import com.minh.profile.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "profile", name = "PROVIDER_PROFILE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ProviderProfileEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "ORGANIZATION_NAME")
    private String organizationName;

    @Column(name = "ORGANIZATION_TYPE")
    private String organizationType;

    @Column(name = "WEBSITE")
    private String website;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "ADDRESS_SUMMARY")
    private String addressSummary;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "YEAR_ESTABLISHED")
    private Integer yearEstablished;

    @Column(name = "ACCREDITATION")
    private String accreditation;

    @Column(name = "SPECIALIZATION")
    private String specialization;

    @Column(name = "VERIFIED")
    private Boolean verified;

    @Column(name = "COUNTRY")
    private String country;

}
