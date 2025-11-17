package com.minh.subscription.data.entity;

import com.minh.enumeration.subscription.SubscriptionTargetType;
import com.minh.subscription.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(schema = "subscription", name = "SUBSCRIPTION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class SubscriptionEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "USER_TYPE")
    private SubscriptionTargetType userType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLAN_ID")
    private SubscriptionPlanEntity plan;

    @Column(name = "START_DATE")
    private LocalDateTime startDate;

    @Column(name = "END_DATE")
    private LocalDateTime endDate;

    @Column(name = "STATUS")
    private String status;

}
