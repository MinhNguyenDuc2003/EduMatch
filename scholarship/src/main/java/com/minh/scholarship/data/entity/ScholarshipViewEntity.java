package com.minh.scholarship.data.entity;

import com.minh.scholarship.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "SCHOLARSHIP_VIEW")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ScholarshipViewEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SCHOLARSHIP_ID")
    private Long scholarshipId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "FULL_NAME")
    private String fullName;

}
