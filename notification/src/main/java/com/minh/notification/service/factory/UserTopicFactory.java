package com.minh.notification.service.factory;

import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.exception.InternalServerErrorException;
import com.minh.notification.service.UserTopicService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserTopicFactory {

    private static final ConcurrentHashMap<String, UserTopicService> userTopicServiceMap = new ConcurrentHashMap<>();

    @Autowired
    private List<UserTopicService> userTopicServices;

    @PostConstruct
    public void init() {
        for (UserTopicService service : userTopicServices) {
            String code = service.getType().getCode();
            userTopicServiceMap.computeIfAbsent(code, k -> service);
        }
    }

    public UserTopicService getUserTopicService(NotificationTopicEnum topic) {
        UserTopicService service = userTopicServiceMap.get(topic.getCode());
        if (service == null) {
            throw new InternalServerErrorException("User topic service not found");
        }
        return service;
    }

}
