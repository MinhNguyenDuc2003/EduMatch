package com.minh.scholarship.service.impl;

import com.minh.scholarship.data.entity.ScholarshipEntity;
import com.minh.scholarship.data.entity.repository.ScholarshipRepository;
import com.minh.scholarship.service.ScholarshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScholarshipServiceImpl implements ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;

    @Override
    public List<ScholarshipEntity> getAll() {
        return scholarshipRepository.findAll();
    }

    @Override
    public Optional<ScholarshipEntity> getById(Long id) {
        return scholarshipRepository.findById(id);
    }

    @Override
    public ScholarshipEntity create(ScholarshipEntity scholarship) {
        return scholarshipRepository.save(scholarship);
    }

    @Override
    public ScholarshipEntity update(Long id, ScholarshipEntity scholarship) {
        ScholarshipEntity existing = scholarshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scholarship not found with id: " + id));

        existing.setTitle(scholarship.getTitle());
        existing.setSlug(scholarship.getSlug());
        existing.setShortDescription(scholarship.getShortDescription());
        existing.setDescription(scholarship.getDescription());
        existing.setRequirements(scholarship.getRequirements());
        existing.setBenefits(scholarship.getBenefits());
        existing.setFields(scholarship.getFields());
        existing.setCountry(scholarship.getCountry());
        existing.setUniversity(scholarship.getUniversity());
        existing.setStudyLevel(scholarship.getStudyLevel());
        existing.setScholarshipType(scholarship.getScholarshipType());
        existing.setFundingAmount(scholarship.getFundingAmount());
        existing.setStartDate(scholarship.getStartDate());
        existing.setEndDate(scholarship.getEndDate());
        existing.setAvailableSlots(scholarship.getAvailableSlots());
        existing.setLanguageRequirement(scholarship.getLanguageRequirement());
        existing.setGpaRequirement(scholarship.getGpaRequirement());

        return scholarshipRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!scholarshipRepository.existsById(id)) {
            throw new RuntimeException("Scholarship not found with id: " + id);
        }
        scholarshipRepository.deleteById(id);
    }
}
