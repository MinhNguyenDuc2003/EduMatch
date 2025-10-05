package com.minh.media.data.entity;

import com.minh.media.data.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "media", name = "MEDIA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Builder
public class MediaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "S3_KEY")
    private String s3Key;

    @Column(name = "CONTENT_TYPE")
    private String contentType;

    @Column(name = "SIZE")
    private Long size;

    @Column(name = "FOLDER_NAME")
    private String folderName;

    @Column(name = "FILE_NAME")
    private String fileName;

    @Column(name = "IS_PUBLIC")
    private Boolean isPublic;

}
