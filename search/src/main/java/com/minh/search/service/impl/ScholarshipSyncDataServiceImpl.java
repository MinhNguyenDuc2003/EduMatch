package com.minh.search.service.impl;

import com.minh.search.data.mapper.ScholarshipMapper;
import com.minh.search.feign.ScholarshipFeign;
import com.minh.search.service.ScholarshipSyncDataService;
import com.minh.service.base.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl extends BaseService implements ScholarshipSyncDataService {

    private final ScholarshipFeign scholarshipFeign;
    private final ScholarshipMapper  scholarshipMapper;

}
