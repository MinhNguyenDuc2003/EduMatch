package com.minh.model.dto.media;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.BaseDto;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class MediaDto extends BaseDto {

    private Long id;

    private String s3Key;

    private String contentType;

    private Long size;

    private String folderName;

    private String fileName;

    private Boolean isPublic;

    private byte[] thumbnail;

    private String url;

}
