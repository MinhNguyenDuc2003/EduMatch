package com.minh.media.service;

import jakarta.mail.MessagingException;

public interface MailService {

    void sendHtmlMessage(String to, String subject, String htmlBody) throws MessagingException;

}
