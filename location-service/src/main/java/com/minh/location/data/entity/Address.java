package com.minh.location.data.entity;

import com.minh.location.data.entity.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "location", name = "ADDRESS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class Address extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 450, name = "CONTACT_NAME")
    private String contactName;

    @Column(length = 25, name = "PHONE")
    private String phone;

    @Column(length = 450, name = "ADDRESS_LINE_1")
    private String addressLine1;

    @Column(length = 450, name = "ADDRESS_LINE_2")
    private String addressLine2;

    @Column(length = 450, name = "CITY")
    private String city;

    @Column(length = 25, name = "ZIP_CODE")
    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "DISTRICT_ID", nullable = false)
    private District district;

    @ManyToOne
    @JoinColumn(name = "STATE_OR_PROVINCE_ID", nullable = false)
    private StateOrProvince stateOrProvince;

    @ManyToOne
    @JoinColumn(name = "COUNTRY_ID", nullable = false)
    private Country country;

}