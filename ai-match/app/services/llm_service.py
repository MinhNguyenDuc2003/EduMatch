"""LLM analysis service using Google GenAI."""
import json
from typing import Dict, Any
from google import genai
from app.config import get_settings
from app.services.database_service import all_scholarships_query, all_applicant_profile_query
from app.services.embedding_service import create_scholarship_text, create_applicant_text

settings = get_settings()


def llm_analyze(applicant_id: int, scholarship_id: int, sch_cursor, prof_cursor) -> Dict[str, Any]:
    """Analyze match between applicant and scholarship using LLM."""
    # Get data
    all_scholarships = all_scholarships_query(sch_cursor)
    all_applicants = all_applicant_profile_query(prof_cursor)
    
    # Get specific entities
    scholarship = all_scholarships.get(scholarship_id)
    applicant = all_applicants.get(applicant_id)
    
    if not scholarship:
        raise ValueError(f"Scholarship with ID {scholarship_id} not found")
    if not applicant:
        raise ValueError(f"Applicant with ID {applicant_id} not found")
    
    # Create text representations
    scholarship_text = create_scholarship_text(scholarship)
    applicant_text = create_applicant_text(applicant)
    
    # Build prompt
    prompt = f"""
You are a professional scholarship evaluation system.
Your task is to evaluate the match between a student and a scholarship and return the result as valid JSON only.

========================
STUDENT PROFILE
========================
{applicant_text}

========================
SCHOLARSHIP DETAILS
========================
{scholarship_text}

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
- Do not use **
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
    
    # Call GenAI
    client = genai.Client(api_key=settings.google_genai_api_key)
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    
    # Parse response
    response_text = response.text.strip()
    
    # Remove markdown code blocks if present
    if response_text.startswith("```json"):
        response_text = response_text[7:]
    if response_text.startswith("```"):
        response_text = response_text[3:]
    if response_text.endswith("```"):
        response_text = response_text[:-3]
    
    response_text = response_text.strip()
    
    try:
        analysis = json.loads(response_text)
        return analysis
    except json.JSONDecodeError as e:
        # If parsing fails, return raw response
        return {
            "error": "Failed to parse LLM response",
            "raw_response": response_text,
            "parse_error": str(e)
        }
