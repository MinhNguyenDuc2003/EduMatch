package com.minh.scholarship.data.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "scholarship", name = "APPLICATION_ATTRIBUTE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class ApplicationAttributeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "KEY")
    private String key;

    @Column(name = "VALUE")
    private String value;

    @Column(name = "NOTE")
    private String note;

}
