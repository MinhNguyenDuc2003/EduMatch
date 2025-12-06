package com.minh.scholarship.data.entity;

import com.minh.scholarship.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "CASE_STUDY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class CaseStudyEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SCHOLARSHIP_ID")
    private Long scholarshipId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "VERIFIED")
    private Boolean verified;

}
