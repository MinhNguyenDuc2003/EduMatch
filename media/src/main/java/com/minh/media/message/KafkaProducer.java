package com.minh.media.message;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, byte[]> kafkaTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public <T> void convertToByteAndSend(String topic, T message) {
        try {
            if (message == null) {
                log.warn("Producer can not produce 'null' value");
                return;
            }

            log.info("Queue: {}", topic);
            log.info("Message: {}", message);

            kafkaTemplate.send(topic, objectMapper.writeValueAsBytes(message));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

}
