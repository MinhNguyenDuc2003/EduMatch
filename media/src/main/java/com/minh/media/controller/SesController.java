package com.minh.media.controller;

import com.minh.constants.EndPoint;
import com.minh.media.service.SesService;
import com.minh.model.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.MEDIA.MEDIA)
public class SesController {

    @Autowired
    private SesService mailService;
    @Value("${aws.email}")
    private String email;

    @PostMapping("/send")
    public ApiResponse<?> sendMail(@RequestParam String to, @RequestParam String subject, @RequestParam String bodyHtml, @RequestParam String bodyText) {
        mailService.sendMail(email, to, subject, bodyHtml, bodyText);
        return ApiResponse.ok();
    }

}
