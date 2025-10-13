package com.minh.scholarship.controller;

import com.minh.model.ApiResponse;
import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.service.ScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scholarship")
@RequiredArgsConstructor
public class ScholarshipController {

    private final ScholarshipService scholarshipService;

    @GetMapping("/all")
    public ResponseEntity<List<ScholarshipEntity>> getAll() {
        List<ScholarshipEntity> list = scholarshipService.getAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScholarshipEntity> getById(@PathVariable Long id) {
        return scholarshipService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ScholarshipEntity> create(@RequestBody ScholarshipEntity scholarship) {
        ScholarshipEntity created = scholarshipService.create(scholarship);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScholarshipEntity> update(
            @PathVariable Long id,
            @RequestBody ScholarshipEntity scholarship
    ) {
        ScholarshipEntity updated = scholarshipService.update(id, scholarship);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        scholarshipService.delete(id);
        return ResponseEntity.noContent().build();
    }
}