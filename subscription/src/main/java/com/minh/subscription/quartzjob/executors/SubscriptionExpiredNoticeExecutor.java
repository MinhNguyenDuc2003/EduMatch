package com.minh.subscription.quartzjob.executors;

import com.minh.service.base.BaseService;
import com.minh.subscription.service.SubscriptionService;
import lombok.extern.log4j.Log4j2;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class SubscriptionExpiredNoticeExecutor extends BaseService implements Job {

    @Autowired
    private SubscriptionService service;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) {
        try {
            log.info(">>> Start send mail notice");
            service.sendMailExpiredDate5DaysLeft();
            log.info("Send mail Completed<<<");
        } catch (Exception e) {
            log.error("Send mail failed with error");
        }
    }

}
