package com.minh.profile.data.entity;

import com.minh.profile.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "profile", name = "APPLICANT_PREFERENCE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicantPreferenceEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "APPLICANT_ID")
    private Long applicantId;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "WEIGHT")
    private Double weight;

    @Column(name = "FIELD")
    private String field;

}
