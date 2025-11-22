package com.minh.profile.data.entity;

import com.minh.profile.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "profile", name = "PROVIDER_FAVOURITE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderFavouriteEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_ID", nullable = false)
    private String userId;

    @Column(name = "APPLICANT_ID", nullable = false)
    private Long applicantId;

    @Column(name = "NOTE")
    private String note;
}
