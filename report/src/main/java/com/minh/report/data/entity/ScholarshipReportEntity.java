package com.minh.report.data.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "scholarship_reports", schema = "report")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScholarshipReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long scholarshipId;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private ReportEntity report;
}
