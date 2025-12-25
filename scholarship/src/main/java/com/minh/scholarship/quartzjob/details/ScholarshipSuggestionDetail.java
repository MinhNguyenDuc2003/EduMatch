package com.minh.scholarship.quartzjob.details;

import com.minh.scholarship.quartzjob.executors.ScholarshipSuggestionExecutor;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ScholarshipSuggestionDetail {

    @Value("${quartz-job.scholarship-suggestion.name}")
    private String jobName;
    @Value("${quartz-job.scholarship-suggestion.group}")
    private String jobGroup;
    @Value("${quartz-job.scholarship-suggestion.expression}")
    private String cronExpression;

    public JobDetail prepareScholarshipSuggestionDetail() {
        return JobBuilder.newJob(ScholarshipSuggestionExecutor.class)
                .withIdentity(jobName, jobGroup)
                .storeDurably(true)
                .build();
    }

    public Trigger prepareScholarshipSuggestionTrigger() {
        return TriggerBuilder.newTrigger()
                .withIdentity(jobName, jobGroup)
                .forJob(jobName, jobGroup)
                .withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
                .build();
    }

}
