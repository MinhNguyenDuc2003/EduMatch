package com.minh.subscription.quartzjob.details;

import com.minh.subscription.quartzjob.executors.SubscriptionExpiredNoticeExecutor;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SubscriptionExpiredNoticeDetail {

    @Value("${quartz-job.expired-notice.name}")
    private String jobName;
    @Value("${quartz-job.expired-notice.group}")
    private String jobGroup;
    @Value("${quartz-job.expired-notice.expression}")
    private String cronExpression;

    public JobDetail prepareScholarshipSuggestionDetail() {
        return JobBuilder.newJob(SubscriptionExpiredNoticeExecutor.class)
                .withIdentity(jobName, jobGroup)
                .build();
    }

    public Trigger prepareScholarshipSuggestionTrigger() {
        return TriggerBuilder.newTrigger()
                .withIdentity(jobName, jobGroup)
                .withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
                .build();
    }

}
