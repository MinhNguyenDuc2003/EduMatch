package com.minh.scholarship.quartzjob.executors;

import com.minh.model.dto.profile.ApplicantProfileDto;
import com.minh.scholarship.feign.ApplicantProfileFeign;
import com.minh.scholarship.service.ScholarshipService;
import com.minh.service.base.BaseService;
import lombok.extern.log4j.Log4j2;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class ScholarshipSuggestionExecutor extends BaseService implements Job {

    @Autowired
    private ScholarshipService scholarshipService;
    @Autowired
    private ApplicantProfileFeign applicantProfileFeign;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) {
        try {
            log.info(">>> Start send scholarship suggestion");
            List<ApplicantProfileDto> applicantProfileDto = this.parseResponse(applicantProfileFeign.getAll());
            applicantProfileDto.forEach(applicantProfile -> {
                scholarshipService.sendMailSuggestion(applicantProfile.getUserId());
            });
            log.info("Send mail Completed<<<");
        } catch (Exception e) {
            log.error("Send mail failed with error");
        }
    }

}
