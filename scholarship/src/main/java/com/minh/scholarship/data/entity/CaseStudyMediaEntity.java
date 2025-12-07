package com.minh.scholarship.data.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "CASE_STUDY_MEDIA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class CaseStudyMediaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CASE_STUDY_ID")
    private Long caseStudyId;

    @Column(name = "MEDIA_ID")
    private Long mediaId;

}
