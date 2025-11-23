package com.minh.media.service.impl;

import com.minh.media.data.mapper.MailMapper;
import com.minh.media.data.mapper.MailTemplateMapper;
import com.minh.media.data.repository.MailRepository;
import com.minh.media.data.repository.MailTemplateRepository;
import com.minh.media.service.MailService;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final MailRepository mailRepository;
    private final MailTemplateRepository mailTemplateRepository;
    private final MailMapper mailMapper;
    private final MailTemplateMapper mailTemplateMapper;

    @Override
    public void sendHtmlMessage(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);

        mailSender.send(message);
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
