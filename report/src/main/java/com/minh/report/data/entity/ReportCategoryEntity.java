package com.minh.report.data.entity;

import com.minh.enumeration.report.ReportCategoryType;
import com.minh.report.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "report", name = "REPORT_CATEGORIES")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ReportCategoryEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE")
    private ReportCategoryType type;
}
