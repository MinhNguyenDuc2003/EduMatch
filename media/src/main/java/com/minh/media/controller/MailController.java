package com.minh.media.controller;

import com.minh.constants.EndPoint;
import com.minh.media.service.MailService;
import com.minh.model.ApiResponse;
import com.minh.model.dto.media.MailDto;
import com.minh.model.dto.media.MailTemplateDto;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.MEDIA.MAIL)
public class MailController {

    private final MailService mailService;

    @PostMapping("/send")
    public ApiResponse<?> sendMail(@RequestBody MailDto mailDto) throws MessagingException {
        mailService.sendHtmlMessage(mailDto.getTo(), mailDto.getSubject(), mailDto.getBody());
        mailDto.setFrom("system");
        mailService.save(mailDto);
        return ApiResponse.ok();
    }

    @GetMapping("/template")
    public ApiResponse<MailTemplateDto> getMailTemplate(@RequestParam String type) {
        return ApiResponse.ok(mailService.findTemplateByType(type));
    }

}
