package com.minh.subscription.data.entity;

import com.minh.subscription.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(schema = "subscription", name = "PAYMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class PaymentEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SUBSCRIPTION_ID")
    private SubscriptionEntity subscription;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "AMOUNT")
    private Double amount;

    @Column(name = "CURRENCY")
    private String currency;

    @Column(name = "PAYMENT_METHOD")
    private String paymentMethod;

    @Column(name = "TRANSACTION_ID")
    private String transactionId;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "PAID_AT")
    private LocalDateTime paidAt;
}
