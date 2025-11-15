package com.minh.search.data.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.minh.model.dto.media.MediaDto;
import com.minh.model.dto.scholarship.ScholarshipDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScholarshipVo extends ScholarshipDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<ScholarshipVo> scholarship;
    private List<MediaDto> scholarshipMedias;
    private ProviderProfileVo providerProfileVo;
    private int pageNum;
    private int pageSize;
    private int totalPages;
    private long totalElements;
    Map<String, Map<String, Long>> aggregations;
    private int isFollow;
}
