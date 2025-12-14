package com.minh.scholarship.feign;

import com.minh.scholarship.data.vo.ai.AiRequestDto;
import com.minh.scholarship.data.vo.ai.ScholarshipRecommendationResponseDto;
import com.minh.scholarship.data.vo.ApplicationRecommendationVo;
import com.minh.scholarship.data.vo.ProfileRecommendationVo;
import com.minh.scholarship.data.vo.ScholarshipRecommendationVo;
import com.minh.service.feign.FeignInterceptorConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/score/scholarships")
    ScholarshipRecommendationResponseDto getRecommendationScholarship(@RequestBody ScholarshipRecommendationVo vo);

    @GetMapping("/score/profiles")
    ScholarshipRecommendationResponseDto getRecommendationApplicantForScholarship(@RequestBody ProfileRecommendationVo vo);

    @GetMapping("/score/applications")
    ScholarshipRecommendationResponseDto getRankApplicationForScholarship(@RequestBody ApplicationRecommendationVo vo);

    @PostMapping("/analyze/scholarship")
    String getAnalyzeMatch(@RequestBody AiRequestDto request);

    @PostMapping("/analyze/compare")
    String compareScholarships(@RequestBody AiRequestDto request);

}
