package com.minh.customer.data.entity;

import com.minh.customer.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "customer",name = "PROVIDER_ADDRESS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderAddress extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PROVIDER_ID")
    private Long providerId;

    @Column(name = "ADDRESS_ID")
    private Long addressId;

    @Column(name = "IS_ACTIVE")
    private Boolean isActive;

}