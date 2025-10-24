package com.minh.search.model.filter;

import com.minh.model.ApiFilter;
import com.minh.model.dto.scholarship.ScholarshipDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true)
public class ScholarshipFilter extends ApiFilter<ScholarshipDto> {

    private String keyword;
    private Double minGpa;
    private Double maxGpa;

}
