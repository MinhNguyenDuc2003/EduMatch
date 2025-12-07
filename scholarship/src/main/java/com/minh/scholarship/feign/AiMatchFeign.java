package com.minh.scholarship.feign;

import com.minh.model.dto.ai.AiRequestDto;
import com.minh.model.dto.ai.ScholarshipRecommendationResponseDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(
        name = "ai-service",
        url = "${ai.end-point}",
        path = "",
        contextId = "ai-feign-client",
        configuration = FeignInterceptorConfig.class
)
public interface AiMatchFeign {

    @GetMapping("/match/profile/{profileId}")
    ScholarshipRecommendationResponseDto getRecommendationScholarship(@PathVariable Long profileId, @RequestParam("top_k") int topK);

    @GetMapping("/match/scholarship/{scholarshipId}/profiles")
    ScholarshipRecommendationResponseDto getRecommendationApplicantForScholarship(@PathVariable Long scholarshipId, @RequestParam("top_k") int topK);

    @GetMapping("/match/scholarship/{scholarshipId}/applications")
    ScholarshipRecommendationResponseDto getRankApplicationForScholarship(@PathVariable Long scholarshipId, @RequestParam("top_k") int topK);

    @PostMapping("/analyze/llm")
    String getAnalyzeMatch(@RequestBody AiRequestDto request);

    @PostMapping("/compare/llm")
    String compareScholarships(@RequestBody AiRequestDto request);

}
