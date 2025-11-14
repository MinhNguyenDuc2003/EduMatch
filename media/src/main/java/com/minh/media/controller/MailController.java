package com.minh.media.controller;

import com.minh.constants.EndPoint;
import com.minh.media.service.MailService;
import com.minh.model.ApiResponse;
import com.minh.model.dto.media.MailDto;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.MEDIA.MAIL)
public class MailController {

    private final MailService mailService;

    @PostMapping("/send")
    public ApiResponse<?> sendMail(@RequestBody MailDto mailDto) throws MessagingException {
        mailService.sendHtmlMessage(mailDto.getTo(), mailDto.getSubject(), mailDto.getBody());
        return ApiResponse.ok();
    }

}
