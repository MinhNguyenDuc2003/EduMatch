package com.minh.location.controller;

import com.minh.constants.EndPoint;
import com.minh.location.service.StateOrProvinceService;
import com.minh.location.viewmodel.stateorprovince.StateOrProvinceVm;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.LOCATION.STATE_OR_PROVINCES_STOREFRONT_URL)
public class StateOrProvinceStoreFrontController {
    private final StateOrProvinceService stateOrProvinceService;

    @GetMapping("/{countryId}")
    public ResponseEntity<List<StateOrProvinceVm>> getStateOrProvince(@PathVariable("countryId") final Long id) {
        return ResponseEntity.ok(stateOrProvinceService.getAllByCountryId(id));
    }

}
