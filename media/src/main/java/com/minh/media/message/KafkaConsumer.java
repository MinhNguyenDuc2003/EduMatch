package com.minh.media.message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.media.service.MailService;
import com.minh.model.dto.media.MailDto;
import com.minh.service.base.BaseService;
import com.minh.service.concurency.ThreadFactoryBuilder;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadFactory;

@Log4j2
@Service
@RequiredArgsConstructor
public class KafkaConsumer extends BaseService {

    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;
    private final MailService mailService;

    @KafkaListener(topics = "${kafka.mail.send-mail.topic}", groupId = "${kafka.mail.send-mail.group}", containerFactory = "kafkaListenerContainerFactory")
    public void receiveNewEventScholarship(byte[] message) throws JsonProcessingException {
        String messageStr = new String(message);
        MailDto mailDto = objectMapper.readValue(messageStr, MailDto.class);
        ThreadFactoryBuilder threadFactoryBuilder = new ThreadFactoryBuilder();
        ThreadFactory threadFactory = threadFactoryBuilder.build();
        Thread thread = threadFactory.newThread(() -> {
            try {
                mailService.sendHtmlMessage(mailDto.getTo(), mailDto.getSubject(), mailDto.getBody());
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
            mailDto.setFrom("system");
            mailService.save(mailDto);
        });
        thread.start();
    }

}
