package com.minh.report.data.entity;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.enumeration.report.ReportStatus;
import com.minh.report.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "report", name = "REPORTS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ReportEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "COMMENT", columnDefinition = "TEXT")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    private ReportCategoryEntity category;

    @Column(name = "IS_READ")
    private Boolean isRead = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private ReportStatus status = ReportStatus.PENDING;

    @Column(name = "RESPONSE", columnDefinition = "TEXT")
    private String response;
}
