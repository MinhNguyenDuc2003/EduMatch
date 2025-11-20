package com.minh.search.controller;

import com.minh.constants.EndPoint;
import com.minh.model.ApiResponse;
import com.minh.model.dto.scholarship.ScholarshipDto;
import com.minh.search.data.vo.ScholarshipVo;
import com.minh.search.model.filter.ScholarshipFilter;
import com.minh.search.service.ScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(EndPoint.SEARCH.SCHOLARSHIPS)
public class ScholarshipSearchController {

    private final ScholarshipService scholarshipService;

    @GetMapping("/all")
    public ApiResponse<List<ScholarshipDto>> getAll() {
        return ApiResponse.ok(scholarshipService.getAll());
    }

    @PostMapping("/search")
    public ApiResponse<ScholarshipVo> searchScholarships(@RequestBody ScholarshipFilter criteria) {
        return ApiResponse.ok(scholarshipService.findScholarshipAdvance(criteria));
    }

    @GetMapping("/autocomplete/title")
    public List<ScholarshipDto> autocompleteTitle(@RequestParam String keyword) {
        return scholarshipService.autoCompleteScholarshipName(keyword);
    }

    @GetMapping("/autocomplete/university")
    public ApiResponse<List<ScholarshipDto>> autocompleteUniversity(@RequestParam String keyword) {
        return ApiResponse.ok(scholarshipService.autoCompleteUniversity(keyword));
    }

}
