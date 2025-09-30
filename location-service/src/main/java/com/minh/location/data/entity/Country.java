package com.minh.location.data.entity;

import com.minh.location.data.entity.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(schema = "location", name = "country")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class Country extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 450, name = "NAME")
    private String name;

    @Column(length = 3, name = "CODE2")
    private String code2;

    @Column(length = 3, name = "CODE3")
    private String code3;

    @Column(name = "IS_BILLING_ENABLED")
    private Boolean isBillingEnabled;
    @Column(name = "IS_SHIPPING_ENABLED")
    private Boolean isShippingEnabled;
    @Column(name = "IS_CITY_ENABLED")
    private Boolean isCityEnabled;
    @Column(name = "IS_ZIP_CODE_ENABLED")
    private Boolean isZipCodeEnabled;
    @Column(name = "IS_DISTRICT_ENABLED")
    private Boolean isDistrictEnabled;

    @OneToMany(mappedBy = "country")
    private List<StateOrProvince> stateOrProvinces = new ArrayList<>();

}