package com.minh.location.controller;

import com.minh.constants.EndPoint;
import com.minh.location.service.CountryService;
import com.minh.location.viewmodel.country.CountryVm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(EndPoint.LOCATION.COUNTRIES_STOREFRONT_URL)
@RequiredArgsConstructor
public class CountryStorefrontController {
    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<List<CountryVm>> listCountries() {
        return ResponseEntity.ok(countryService.findAllCountries());
    }
}
