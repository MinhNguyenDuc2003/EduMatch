package com.minh.scholarship.data.entity;

import com.minh.scholarship.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "APPLICATION_REVIEW")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicationReviewEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "APPLICATION_ID")
    private Long applicationId;

    @Column(name = "REVIEW_ID")
    private String reviewId;

    @Column(name = "SCORE")
    private String score;

    @Column(name = "COMMENT")
    private String comment;

    @Column(name = "REVIEWED_AT")
    private String reviewedAt;

}
