package com.minh.scholarship.service.impl;

import com.minh.scholarship.data.mapper.ApplicationMapper;
import com.minh.scholarship.data.repository.ApplicationMediaRepository;
import com.minh.scholarship.data.repository.ApplicationRepository;
import com.minh.scholarship.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private ApplicationMediaRepository applicationMediaRepository;
    @Autowired
    private ApplicationMapper  applicationMapper;

}
