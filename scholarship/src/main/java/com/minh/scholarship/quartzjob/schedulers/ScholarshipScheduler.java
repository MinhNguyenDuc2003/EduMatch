package com.minh.scholarship.quartzjob.schedulers;

import com.minh.scholarship.quartzjob.details.ScholarshipSuggestionDetail;
import jakarta.annotation.PostConstruct;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Configuration
@Service
public class ScholarshipScheduler {

    @Autowired
    private Scheduler scheduler;
    @Autowired
    private ScholarshipSuggestionDetail scholarshipSuggestionDetail;
    @Value("${quartz-job.auto-start:false}")
    private boolean autoStart;

    @PostConstruct
    public void schedule() throws SchedulerException {
        if (autoStart) {
            scheduler.scheduleJob(scholarshipSuggestionDetail.prepareScholarshipSuggestionDetail(), scholarshipSuggestionDetail.prepareScholarshipSuggestionTrigger());
            scheduler.start();
        }
    }

}
