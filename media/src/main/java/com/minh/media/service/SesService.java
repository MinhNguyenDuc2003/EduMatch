package com.minh.media.service;

public interface SesService {

    void sendMail(String from, String to, String subject, String bodyHtml, String bodyText);

}
