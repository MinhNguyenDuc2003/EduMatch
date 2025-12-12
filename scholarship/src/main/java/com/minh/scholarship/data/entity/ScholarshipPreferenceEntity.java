package com.minh.scholarship.data.entity;

import com.minh.scholarship.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "SCHOLARSHIP_PREFERENCE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ScholarshipPreferenceEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SCHOLARSHIP_ID")
    private Long scholarshipId;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "FIELD")
    private String field;

    @Column(name = "WEIGHT")
    private Double weight;

}
