package com.minh.subscription.data.entity;

import com.minh.enumeration.subscription.SubscriptionFeatureEnum;
import com.minh.subscription.data.converter.SubscriptionFeatureConverter;
import com.minh.subscription.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(schema = "subscription", name = "SUBSCRIPTION_PLAN")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class SubscriptionPlanEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "CURRENCY")
    private String currency;

    @Column(name = "DURATION_DAYS")
    private Integer durationDays;

    @Column(name = "TARGET_TYPE")
    private String targetType;

    @Column(name = "FEATURES")
    @Convert(converter = SubscriptionFeatureConverter.class)
    private List<SubscriptionFeatureEnum> features;

}
