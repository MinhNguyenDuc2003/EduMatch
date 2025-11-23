package com.minh.subscription.quartzjob.schedulers;

import com.minh.subscription.quartzjob.details.SubscriptionExpiredNoticeDetail;
import jakarta.annotation.PostConstruct;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Configuration
@Service
public class SubscriptionScheduler {

    @Autowired
    private Scheduler scheduler;
    @Autowired
    private SubscriptionExpiredNoticeDetail subscriptionExpiredNoticeDetail;
    @Value("${quartz-job.auto-start:false}")
    private boolean autoStart;

    @PostConstruct
    public void schedule() throws SchedulerException {
        if (autoStart) {
            scheduler.scheduleJob(subscriptionExpiredNoticeDetail.prepareScholarshipSuggestionDetail(), subscriptionExpiredNoticeDetail.prepareScholarshipSuggestionTrigger());
            scheduler.start();
        }
    }

}
