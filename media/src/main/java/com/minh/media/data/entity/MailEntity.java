package com.minh.media.data.entity;

import com.minh.media.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "media", name = "MAIL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class MailEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TEMPLATE_ID")
    private Long templateId;

    @Column(name = "FROM_MAIL")
    private String from;

    @Column(name = "TO_MAIL")
    private String to;

}
