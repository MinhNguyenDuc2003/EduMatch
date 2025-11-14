package com.minh.search.message.config.consumer;

import com.minh.kafka.cdc.config.BaseKafkaListenerConfig;
import com.minh.kafka.cdc.message.ScholarshipCdcMessage;
import com.minh.kafka.cdc.message.ScholarshipMessageKey;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;

@EnableKafka
@Configuration
public class ScholarshipCdcKafkaListenerConfig extends BaseKafkaListenerConfig<ScholarshipMessageKey, ScholarshipCdcMessage> {

    public static final String SCHOLARSHIP_CDC_LISTENER_CONTAINER_FACTORY = "ScholarshipCdcListenerContainerFactory";

    public ScholarshipCdcKafkaListenerConfig(KafkaProperties kafkaProperties) {
        super(ScholarshipMessageKey.class, ScholarshipCdcMessage.class, kafkaProperties);
    }

    @Bean(name = SCHOLARSHIP_CDC_LISTENER_CONTAINER_FACTORY)
    @Primary
    @Override
    public ConcurrentKafkaListenerContainerFactory<ScholarshipMessageKey, ScholarshipCdcMessage> listenerContainerFactory() {
        return super.kafkaListenerContainerFactory();
    }

}
