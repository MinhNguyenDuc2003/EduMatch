package com.minh.scholarship.feign;

import com.minh.model.dto.ai.AiRequestDto;
import com.minh.model.dto.ai.ScholarshipRecommendationResponseDto;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "ai-service",
        url = "${ai.end-point}",
        path = "",
        contextId = "ai-feign-client",
        configuration = FeignInterceptorConfig.class
)
public interface AiMatchFeign {

    @PostMapping("/api/v1/scholarships/search")
    ScholarshipRecommendationResponseDto getRecommendationScholarship(@RequestBody AiRequestDto request);

    @PostMapping("/api/v1/applicants/search")
    ScholarshipRecommendationResponseDto getRecommendationApplicantForScholarship(@RequestBody AiRequestDto request);

    @PostMapping("/api/v1/applications/rank")
    ScholarshipRecommendationResponseDto getRankApplicationForScholarship(@RequestBody AiRequestDto request);

    @PostMapping("/api/v1/analyze")
    String getAnalyzeMatch(@RequestBody AiRequestDto request);

}
