package com.minh.scholarship.quartzjob.executors;

import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.base.BaseService;
import lombok.extern.log4j.Log4j2;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class ScholarshipSuggestionExecutor extends BaseService implements Job {

    @Autowired
    private ScholarshipService scholarshipService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) {
        try {
            log.info(">>> Start send scholarship suggestion");
            log.info("Send mail Completed<<<");
        } catch (Exception e) {
            log.error("Send mail failed with error");
        }
    }

}
