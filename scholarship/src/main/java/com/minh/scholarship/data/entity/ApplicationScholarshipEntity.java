package com.minh.scholarship.data.entity;

import com.minh.scholarship.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(schema = "scholarship", name = "APPLICATION_SCHOLARSHIP")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicationScholarshipEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SCHOLARSHIP_ID")
    private Long scholarshipId;

    @Column(name = "APPLICATION_ID")
    private Long applicationId;

    @Column(name = "STATUS")
    private String status; // ví dụ: PENDING, APPROVED, REJECTED

    @Column(name = "REVIEWED_AT")
    private LocalDateTime reviewedAt;

    @Column(name = "NOTE")
    private String note;
}
