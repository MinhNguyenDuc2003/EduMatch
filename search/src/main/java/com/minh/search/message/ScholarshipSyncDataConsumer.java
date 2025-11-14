package com.minh.search.message;

import com.minh.kafka.cdc.BaseCdcConsumer;
import com.minh.kafka.cdc.RetrySupportDql;
import com.minh.kafka.cdc.message.Operation;
import com.minh.kafka.cdc.message.ScholarshipCdcMessage;
import com.minh.kafka.cdc.message.ScholarshipMessageKey;
import com.minh.search.service.ScholarshipSyncDataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import static com.minh.search.message.config.consumer.ScholarshipCdcKafkaListenerConfig.SCHOLARSHIP_CDC_LISTENER_CONTAINER_FACTORY;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScholarshipSyncDataConsumer extends BaseCdcConsumer<ScholarshipMessageKey, ScholarshipCdcMessage> {

    private final ScholarshipSyncDataService scholarshipSyncDataService;


    @KafkaListener(
            id = "scholarship-sync-es",
            groupId = "${kafka.scholarship.cdc.group}",
            topics = "${kafka.scholarship.cdc.topic}",
            containerFactory = SCHOLARSHIP_CDC_LISTENER_CONTAINER_FACTORY
    )
    @RetrySupportDql(listenerContainerFactory = SCHOLARSHIP_CDC_LISTENER_CONTAINER_FACTORY)
    public void processMessage(
            @Header(KafkaHeaders.RECEIVED_KEY) ScholarshipMessageKey key,
            @Payload(required = false) @Valid ScholarshipCdcMessage scholarshipCdcMessage,
            @Headers MessageHeaders headers
    ) {
        System.out.println("ScholarshipSyncDataConsumer processMessage");
        processMessage(key, scholarshipCdcMessage, headers, this::sync);
    }

    public void sync(ScholarshipMessageKey key, ScholarshipCdcMessage scholarshipCdcMessage) {
        boolean isHardDeleteEvent = scholarshipCdcMessage == null || Operation.DELETE.equals(scholarshipCdcMessage.getOp());
        if (isHardDeleteEvent) {
            log.warn("Having hard delete event for scholarship: '{}'", key.getId());
            scholarshipSyncDataService.deleteById(key.getId());
        } else {
            var operation = scholarshipCdcMessage.getOp();
            var scholarshipId = key.getId();
            switch (operation) {
                case CREATE, READ -> scholarshipSyncDataService.create(scholarshipId);
                case UPDATE -> scholarshipSyncDataService.update(scholarshipId);
                default -> log.warn("Unsupported operation '{}' for scholarship: '{}'", operation, scholarshipId);
            }
        }
    }

}
