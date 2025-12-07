package com.minh.report.data.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "profile_reports", schema = "report")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long profileId;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private ReportEntity report;

}
