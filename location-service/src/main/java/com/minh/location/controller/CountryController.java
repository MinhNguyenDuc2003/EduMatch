package com.minh.location.controller;

import com.minh.constants.Constants;
import com.minh.constants.EndPoint;
import com.minh.location.data.entity.Country;
import com.minh.location.service.CountryService;
import com.minh.location.viewmodel.country.CountryListGetVm;
import com.minh.location.viewmodel.country.CountryPostVm;
import com.minh.location.viewmodel.country.CountryVm;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController(EndPoint.LOCATION.COUNTRY)
@RequestMapping(EndPoint.LOCATION.COUNTRY)
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/paging")
    public ResponseEntity<CountryListGetVm> getPageableCountries(
        @RequestParam(value = "pageNo", defaultValue = Constants.PageableConstant.DEFAULT_PAGE_NUMBER, required = false)
        final int pageNo,
        @RequestParam(value = "pageSize", defaultValue = Constants.PageableConstant.DEFAULT_PAGE_SIZE, required = false)
        final int pageSize) {
        return ResponseEntity.ok(countryService.getPageableCountries(pageNo, pageSize));
    }

    @GetMapping
    public ResponseEntity<List<CountryVm>> listCountries() {
        return ResponseEntity.ok(countryService.findAllCountries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountryVm> getCountry(@PathVariable("id") final Long id) {
        return ResponseEntity.ok(countryService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CountryVm> createCountry(
        @Valid @RequestBody final CountryPostVm countryPostVm,
        final UriComponentsBuilder uriComponentsBuilder) {
        final Country country = countryService.create(countryPostVm);
        return ResponseEntity.created(
                uriComponentsBuilder
                    .replacePath("/countries/{id}")
                    .buildAndExpand(country.getId())
                    .toUri())
            .body(CountryVm.fromModel(country));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCountry(@PathVariable final Long id,
                                              @Valid @RequestBody final CountryPostVm countryPostVm) {
        countryService.update(countryPostVm, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable(name = "id") final Long id) {
        countryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
