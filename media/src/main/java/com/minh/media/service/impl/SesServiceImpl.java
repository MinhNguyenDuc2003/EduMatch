package com.minh.media.service.impl;

import com.minh.media.service.SesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Service
@RequiredArgsConstructor
public class SesServiceImpl implements SesService {

    private final SesClient sesClient;

    @Override
    public void sendMail(String from, String to, String subject, String bodyHtml, String bodyText) {
        try {
            Destination destination = Destination.builder()
                    .toAddresses(to)
                    .build();

            Content subjContent = Content.builder()
                    .data(subject)
                    .charset("UTF-8")
                    .build();

            Body body = Body.builder()
                    .text(Content.builder().data(bodyText).build())
                    .html(Content.builder().data(bodyHtml).build())
                    .build();

            Message message = Message.builder()
                    .subject(subjContent)
                    .body(body)
                    .build();

            SendEmailRequest request = SendEmailRequest.builder()
                    .source(from)
                    .destination(destination)
                    .message(message)
                    .build();

            SendEmailResponse response = sesClient.sendEmail(request);
        } catch (SesException e) {
            throw new RuntimeException("Error sending mail via SES: " + e.awsErrorDetails().errorMessage(), e);
        }
    }

}
