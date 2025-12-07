package com.minh.media.service;

import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import jakarta.mail.MessagingException;

public interface MailService {

    void sendHtmlMessage(String to, String subject, String htmlBody) throws MessagingException;

    void save(MailDto dto);

    MailTemplateDto findTemplateByType(String type);
}
