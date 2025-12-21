package com.minh.media.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.media.data.mapper.MailMapper;
import com.minh.media.data.mapper.MailTemplateMapper;
import com.minh.media.data.repository.MailRepository;
import com.minh.media.data.repository.MailTemplateRepository;
import com.minh.media.service.MailService;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    @Value("${mail.resend-key}")
    private String resendKey;
    private static final String RESEND_URL = "https://api.resend.com/emails";

    private final JavaMailSender mailSender;
    private final MailRepository mailRepository;
    private final MailTemplateRepository mailTemplateRepository;
    private final MailMapper mailMapper;
    private final MailTemplateMapper mailTemplateMapper;

    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void sendHtmlMessage(String to, String subject, String htmlBody) {

        try {
            Map<String, Object> body = Map.of(
                    "from", "Edumatch <support@edumatch.space>",
                    "to", List.of(to),
                    "subject", subject,
                    "html", htmlBody
            );

            String json = objectMapper.writeValueAsString(body);

            Request request = new Request.Builder()
                    .url(RESEND_URL)
                    .addHeader("Authorization", "Bearer " + resendKey)
                    .post(RequestBody.create(json, MediaType.parse("application/json")))
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    throw new RuntimeException("Resend send mail failed: " + response.body().string());
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Resend API error", e);
        }
    }

    @Override
    public void save(MailDto dto) {
        mailRepository.save(mailMapper.toEntity(dto));
    }

    @Override
    public MailTemplateDto findTemplateByType(String type) {
        return mailTemplateMapper.toDto(mailTemplateRepository.findByType(type));
    }

}
