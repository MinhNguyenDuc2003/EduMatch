package com.minh.notification.service.impl;

import com.minh.enumeration.notification.NotificationTopicEnum;
import com.minh.model.dto.profile.ProviderFollowerDto;
import com.minh.notification.feign.ProviderFollowerFeign;
import com.minh.notification.service.UserTopicService;
import com.minh.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProviderFollowerServiceImpl extends BaseService implements UserTopicService {

    @Autowired
    private ProviderFollowerFeign providerFollowerFeign;

    @Override
    public NotificationTopicEnum getType() {
        return NotificationTopicEnum.PROVIDER_FOLLOWER;
    }

    @Override
    public List<String> getUserTopics(String userId) {
        System.out.println("UserId: " + userId);
        List<ProviderFollowerDto> allFollowers = this.parseResponse(providerFollowerFeign.getAllFollowers(userId));
        return allFollowers.stream().map(ProviderFollowerDto::getUserId).collect(Collectors.toList());
    }

    @Override
    public List<String> getAllTopicsFollow() {
        List<ProviderFollowerDto> allTopics = this.parseResponse(providerFollowerFeign.getAllProviders());
        return allTopics.stream().map(ProviderFollowerDto::getUserId).collect(Collectors.toList());
    }

}
