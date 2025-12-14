import json
import time
from utils import extract_json
from model import gemini_model

class ScholarshipLLMAnalyzer:
    def __init__(self):
        self.model = gemini_model

    def analyze_scholarship(self, application, scholarship):
        
        # Build prompt
        prompt = f"""
    You are a professional scholarship evaluation system.
    Your task is to evaluate the match between a student and a scholarship and return the result as valid JSON only.

    ========================
    STUDENT PROFILE (JSON)
    ========================
    {application}

    ========================
    SCHOLARSHIP DETAILS (JSON)
    ========================
    {scholarship}

    Pay close attention to:
    - Required GPA vs Student GPA
    - Required language levels (IELTS / TOEFL / JLPT / HSK) vs Student language proficiency
    - If the student's language proficiency is lower than the scholarship requirement:
      * Do NOT generate positive match reasons based on language.
      * Instead, clearly mention language as an area for improvement in improvement_areas.
      * Add specific advice in application_tips on how to improve language scores before applying.
    - Required study level vs Student current/target level
    - Required major/fields vs Student major or related expertise
    - Explicit eligibility constraints (country restrictions, background requirements, etc.)

    If either the scholarship or the applicant includes preference information, prioritize these preferences when evaluating compatibility.

    ========================
    TASKS
    ========================
    1. Evaluate how well the student matches the scholarship.
    2. For the scholarship, provide:
      - match_reasons: Why the student is a good match (1-2)
            (- If the student's GPA is lower than the scholarship's required GPA:
                * Do NOT generate any positive GPA-related match reasons.
                * Do NOT say the GPA is 'close', 'almost meets', or 'acceptable'.
                * Instead, clearly mark GPA as a weakness in improvement_areas.)
      - student_strengths: Specific strengths relevant to this scholarship (2-3)
      - improvement_areas: Things the student should improve (2-3)
      - application_tips: Tips to maximize acceptance chance (2-3)

    3. Provide overall_strategy for the student.
    4. Provide timeline for preparing documents, exams, and submission.

    ========================
    RESPONSE RULES
    ========================
    - Keep all text concise; do not write long explanations.
    - Return ONLY valid JSON.
    - No Markdown, no explanation, no text before or after JSON.
    - Do NOT include ```json markers.
    - Do NOT use any Markdown formatting, especially no ** for bold.
    - Ensure JSON is well-formed (no trailing commas).
    - All fields MUST follow this structure:

    {{
      "recommendations": [
        {{
          "scholarship_name": "",
          "match_reasons": [],
          "student_strengths": [],
          "improvement_areas": [],
          "application_tips": []
        }}
      ],
      "overall_strategy": "",
      "timeline": []
    }}

    Generate JSON now.
    """
        try:
                # Generate response
                response = self.model.generate_content(prompt)

                llm_analysis = extract_json(response.text)

                return {
                    'success': True,
                    'analysis': llm_analysis
                }

        except Exception as e:
                return {
                    'success': False,
                    'error': str(e),
                    'analysis': None
                }

    def compare_scholarships(self, profile, scholaships_list):
        """
        Use LLM to provide comparative analysis across scholarships
        """

        # Build comparison prompt
        prompt = f"""
You are a scholarship advisor comparing multiple scholarship options for a student.

========================
STUDENT PROFILE (JSON)
========================
{profile}

========================
SCHOLARSHIP OPTIONS 
========================
{scholaships_list}

========================
YOUR TASK
========================
Provide a comparative analysis to help the student decide. Focus on:

1. **Best Overall Match**: Which scholarship is the best fit and why?
2. **Unique Advantages**: What makes each scholarship special?
   - For each scholarship, list 1-2 unique advantages
3. **Trade-offs**: What are the key differences the student should consider?
   - Compare: Location, funding amount, prestige, requirements, career prospects
4. **Strategic Recommendation**: Which should the student prioritize and why?
5. **Application Strategy**: How should the student approach applying to multiple scholarships?

========================
RESPONSE RULES
========================
- Keep text concise and actionable
- Do not use ** for bold
- Return ONLY valid JSON
- No Markdown, no explanation
- Do NOT include ```json markers
- Ensure JSON is well-formed (no trailing commas)

Required JSON structure:
{{
  "best_overall_match": {{
    "scholarship_name": "",
    "reasons": []
  }},
  "unique_advantages": [
    {{
      "scholarship_name": "",
      "advantages": []
    }}
  ],
  "key_tradeoffs": [
    {{
      "factor": "",
      "comparison": ""
    }}
  ],
  "strategic_recommendation": {{
    "priority_order": [],
    "reasoning": ""
  }},
  "application_strategy": {{
    "approach": "",
    "timeline_tips": []
  }}
}}

Generate JSON now.
"""

        try:
                # Generate response
                response = self.model.generate_content(prompt)

                llm_analysis = extract_json(response.text)

                return {
                    'success': True,
                    'analysis': llm_analysis
                }

        except Exception as e:
                return {
                    'success': False,
                    'error': str(e),
                    'analysis': None
                }