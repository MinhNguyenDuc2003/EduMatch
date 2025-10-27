package com.minh.search.service;

import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.search.data.vo.ScholarshipVo;
import com.minh.search.model.filter.ScholarshipFilter;

import java.util.List;

public interface ScholarshipService {

    ScholarshipVo findScholarshipAdvance(ScholarshipFilter criteria);

    List<ScholarshipDto> autoCompleteScholarshipName(String keyword);

    List<ScholarshipDto> getAll();
}
