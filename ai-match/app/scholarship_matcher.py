import json
import re
import os

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

import google.generativeai as genai

from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

import psycopg2
from psycopg2 import Error

from decimal import Decimal
from datetime import datetime

from app.scholarship_query import ScholarshipQuery

import numpy as np


class ScholarshipMatcher:
    def __init__(self):
        self.weights = {
            'hard_requirements': 0.3,
            'academic_fit': 0.2,
            'semantic_match': 0.5
        }

        self.model = SentenceTransformer("BAAI/bge-large-en-v1.5")

        self.query = ScholarshipQuery()

    def parse_language_requirement(self, requirement_str):
        """Parse language requirement string"""
        requirements = {}

        # Extract IELTS
        ielts_match = re.search(r'IELTS\s+([\d.]+)', requirement_str)
        if ielts_match:
            requirements['ielts'] = float(ielts_match.group(1))

        # Extract TOEFL
        toefl_match = re.search(r'TOEFL\s+(\d+)', requirement_str)
        if toefl_match:
            requirements['toefl'] = int(toefl_match.group(1))

        return requirements

    def check_hard_requirements(self, application, scholarship):
        """Tier 1: Scored requirements (no elimination)"""

        application_age = application.get('age', None)
        application_gender = application.get('gender', None)
        application_nationality = application.get('nationality', None)
        application_study_level = application.get('study_level', None)
        application_ielts_score = application.get('ielts_score', None)
        application_toefl_score = application.get('toefl_score', None)

        scholarship_required_ielts = scholarship.get('required_ielts_score', None)
        scholarship_required_toefl = scholarship.get('required_toefl_score', None)
        scholarship_min_age = scholarship.get('min_age', None)
        scholarship_max_age = scholarship.get('max_age', None)
        scholarship_required_gender = scholarship.get('gender', 'Any')
        scholarship_nationality = scholarship.get('nationality', None)
        scholarship_required_level = scholarship.get('study_level', None)

        scholarship_restricted_nationalities = scholarship.get('restricted_nationalities', None)
        if scholarship_restricted_nationalities:
            scholarship_restricted_nationalities = scholarship_restricted_nationalities.split(', ')

        scores = {}
        reasons = []

        # Age check - scored instead of binary
        if application_age is None and (scholarship_min_age is not None or scholarship_max_age is not None):
            scores['age'] = 0.3
            reasons.append("Age not provided")
        elif scholarship_min_age is None and scholarship_max_age is None:
            scores['age'] = 1.0
        else:
            if scholarship_min_age <= application_age <= scholarship_max_age:
                scores['age'] = 1.0
            else:
                # Penalty based on how far outside range
                if application_age < scholarship_min_age:
                    age_diff = scholarship_min_age - application_age
                    scores['age'] = max(0.3, 1.0 - age_diff * 0.1)
                    reasons.append(f"Age {application_age} below minimum {scholarship_min_age}")
                else:
                    age_diff = application_age - scholarship_max_age
                    scores['age'] = max(0.3, 1.0 - age_diff * 0.1)
                    reasons.append(f"Age {application_age} above maximum {scholarship_max_age}")



        # Nationality check - scored
        if scholarship_restricted_nationalities is None:
            scores['nationality'] = 1.0
        elif application_nationality is not None:
            if application_nationality in scholarship_restricted_nationalities:   
                scores['nationality'] = 0  # Heavy penalty but not elimination
                reasons.append(f"Nationality {application_nationality} is restricted")
        else:
            scores['nationality'] = 1.0

        # Study level check - scored
        if application_study_level is not None and scholarship_required_level is not None and application_study_level == scholarship_required_level:
            scores['study_level'] = 1.0
        elif (application_study_level == 'Master' and scholarship_required_level == 'Bachelor') or \
             (application_study_level == 'PhD' and scholarship_required_level in ['Bachelor', 'Master']):
            scores['study_level'] = 0.8  # Higher level is acceptable
        else:
            scores['study_level'] = 0.3  # Lower level gets penalty
            reasons.append(f"Study level {application_study_level} doesn't match {scholarship_required_level}")

        # Gender check - scored
        if scholarship_required_gender == 'Any' or application_gender == scholarship_required_gender:
            scores['gender'] = 1.0
        else:
            scores['gender'] = 0.3
            reasons.append(f"Gender requirement not met)")

        # Language requirement
        #lang_reqs = self.parse_language_requirement(scholarship['language_requirement'])

        if scholarship_required_ielts is None and scholarship_required_toefl is None:  
          scores['language'] = 1.0
        elif application_ielts_score == 0 and application_toefl_score == 0:
          scores['language'] = 0.3
        else:
          ielts_ratio = 0
          toefl_ratio = 0

          if scholarship_required_ielts not in (None, 0, 999) and application_ielts_score not in (None, 0):
            ielts_ratio = application_ielts_score / scholarship_required_ielts

          if scholarship_required_toefl not in (None, 0, 999) and application_toefl_score not in (None, 0):
            toefl_ratio = application_toefl_score / scholarship_required_toefl

          # Take the best score
          lang_ratio = max(ielts_ratio, toefl_ratio)

          if lang_ratio >= 1.0:
              scores['language'] = 1.0
          elif lang_ratio >= 0.8:
              scores['language'] = 0.8
              reasons.append(f"Language slightly below requirement (IELTS {application_ielts_score}/{scholarship_required_ielts}, TOEFL {application_toefl_score}/{scholarship_required_toefl})")
          else:
              scores['language'] = max(0.3, lang_ratio)
              reasons.append(f"Language below requirement (IELTS {application_ielts_score}/{scholarship_required_ielts}, TOEFL {application_toefl_score}/{scholarship_required_toefl})")

        return {
            'scores': scores,
            'reasons': reasons
        }

    def score_academic_requirements(self, application, scholarship):
        """Tier 2: Scored academic requirements"""

        application_gpa = application.get('gpa', None)
        application_research_experience = application.get('research_experience', None)
        application_pubs = application.get('publication_count', None)
        application_exp = application.get('work_experience_years', None)
        application_percentile = application.get('class_rank_percentile', None)
        application_sat = application.get('sat_score', None)
        application_act = application.get('act_score', None)
        application_gre = application.get('gre_score', None)
        application_gmat = application.get('gmat_score', None)

        scholarship_required_exp = scholarship.get('required_work_experience_years', None)
        scholarship_gpa_requirement = scholarship.get('gpa_requirement', None)
        scholarship_research_experience_requirement = scholarship.get('research_experience_requirement', None)
        scholarship_required_pubs = scholarship.get('required_publication_count', None)
        scholarship_required_percentile = scholarship.get('required_class_rank_percentile', None)
        scholarship_required_sat = scholarship.get('required_sat_score', None)
        scholarship_required_act = scholarship.get('required_act_score', None)
        scholarship_required_gre = scholarship.get('required_gre_score', None)
        scholarship_required_gmat = scholarship.get('required_gmat_score', None)


        scores = {}

        # GPA scoring (with bonus for exceeding)
        if scholarship_gpa_requirement is None:
            # Not required - skip scoring (will be excluded from average)
            scores['gpa'] = 1.0
        elif application_gpa is None:
            # Not met - don't add to scores (skip)
            scores['gpa'] = 0.3
        elif application_gpa >= scholarship_gpa_requirement:
            gpa_excess = (application_gpa - scholarship_gpa_requirement) / 4.0
            scores['gpa'] = min(1.0, 0.85 + gpa_excess * 3)
        else:
            scores['gpa'] = 0.3


        # Publication scoring - only score if met requirement

        if scholarship_required_pubs is None or application_pubs is None:
            # Not required - skip scoring (will be excluded from average)
            pass
        elif application_pubs >= scholarship_required_pubs:
            # Met requirement - give score with bonus
            pub_bonus = (application_pubs - scholarship_required_pubs) * 0.1
            scores['publications'] = min(1.0, 0.8 + pub_bonus)
        # else: Not met - don't add to scores (skip)
        else:
            pass

        # Work experience scoring - only score if met requirement

        if scholarship_required_exp is None or application_exp is None:
            # Not required - skip scoring
            pass
        elif application_exp >= scholarship_required_exp:
            # Met requirement - give score with bonus
            exp_bonus = (application_exp - scholarship_required_exp) * 0.1
            scores['work_experience'] = min(1.0, 0.8 + exp_bonus)
        else:
            pass
        # else: Not met - don't add to scores (skip)

        # Class rank scoring - only score if met requirement

        if scholarship_required_percentile is None or application_percentile is None:
            # Not required - skip scoring
            pass
        elif application_percentile <= scholarship_required_percentile:
            # Met requirement - give score
            scores['class_rank'] = 1.0 - (application_percentile / 100) * 0.3
        else:
            pass
        # else: Not met - don't add to scores (skip)


        test_scores = []

        # SAT scoring
        if scholarship_required_sat is None or application_sat is None:
            # Not required - skip scoring
            pass
        elif application_sat >= scholarship_required_sat:
            # Met requirement - give score with bonus
            sat_bonus = (application_sat - scholarship_required_sat) * 0.1
            scores['sat'] = min(1.0, 0.8 + sat_bonus)
        else:
            pass
        # else: Not met - don't add to scores (skip)

        # ACT scoring
        if scholarship_required_act is None or application_act is None:
            # Not required - skip scoring
            pass
        elif application_act >= scholarship_required_act:
            # Met requirement - give score with bonus
            act_bonus = (application_act - scholarship_required_act) * 0.1
            scores['act'] = min(1.0, 0.8 + act_bonus)
        else:
            pass
        # else: Not met - don't add to scores (skip)

        # GMAT scoring
        if scholarship_required_gmat is None or application_gmat is None:
            # Not required - skip scoring
            pass
        elif application_gmat >= scholarship_required_gmat:
            # Met requirement - give score with bonus
            gmat_bonus = (application_gmat - scholarship_required_gmat) * 0.1
            scores['gmat'] = min(1.0, 0.8 + gmat_bonus)
        else:
            pass
        # else: Not met - don't add to scores (skip)

        # GRE scoring
        if scholarship_required_gre is None or application_gre is None:
            # Not required - skip scoring
            pass
        elif application_gre >= scholarship_required_gre:
            # Met requirement - give score with bonus
            gre_bonus = (application_gre - scholarship_required_gre) * 0.1
            scores['gre'] = min(1.0, 0.8 + gre_bonus)
        else:
            pass
        # else: Not met - don't add to scores (skip)

        # Take the highest score among SAT/ACT/GMAT/GRE
        if test_scores:
            scores['SAT/ACT/GMAT/GRE_test'] = max(test_scores)
        else:
            scores['SAT/ACT/GMAT/GRE_test'] = 1.0

        return scores

    def semantic_matching(self, application, scholarship):
        """Tier 3: AI-based semantic matching"""
        application_major = application.get('major', None)
        application_skills = application.get('skills', None)
        application_research = f"{application.get('research_interest', '')} {application.get('personal_statement', '')}"

        scholarship_requirements = scholarship.get('requirements', None)
        scholarship_required_majors = scholarship.get('required_major', None)
        scholarship_research = f"{scholarship.get('description', '')} {scholarship.get('fields', '')} {scholarship.get('requirements', '')}"

        scores = {}


        # Major matching (flexible semantic)
        if application_major is None:
            application_major = ''
        if scholarship_required_majors is None:
            scholarship_required_majors = ''
        if application_skills is None:
            application_skills = ''
        if scholarship_requirements is None:
            scholarship_requirements = ''
        if application_research is None:
            application_research = ''
        if scholarship_research is None:
            scholarship_research = ''

        if application_research.strip() and scholarship_research.strip() :
            research_emb = self.model.encode([application_research])
            scholarship_emb = self.model.encode([scholarship_research])
            scores['research_fit'] = cosine_similarity(research_emb, scholarship_emb)[0][0]
        else:
            scores['research_fit'] = 0.3

        major_emb = self.model.encode([application_major])
        required_emb = self.model.encode([scholarship_required_majors])
        major_similarity = cosine_similarity(major_emb, required_emb)[0][0]

        # Boost if exact match exists
        if any(maj.strip().lower() in application_major.lower()
               for maj in scholarship_required_majors.split(',')):
            scores['major_fit'] = 1.0
        else:
            scores['major_fit'] = major_similarity

        """# Awards matching (hybrid: keyword + semantic)
        candidate_awards = application.get('academicAwards', '') + ' ' + application.get('achievements', '')
        required_awards = scholarship.get('requiredAcademicAwards', '')

        if required_awards and candidate_awards:
            # Keyword matching
            required_keywords = set(required_awards.lower().split())
            candidate_keywords = set(candidate_awards.lower().split())
            keyword_overlap = len(required_keywords & candidate_keywords) / len(required_keywords) if required_keywords else 0

            # Semantic matching
            award_emb = model.encode([candidate_awards])
            req_award_emb = model.encode([required_awards])
            semantic_sim = cosine_similarity(award_emb, req_award_emb)[0][0]

            # Combine both
            scores['awards_fit'] = 0.6 * keyword_overlap + 0.4 * semantic_sim
        else:
            scores['awards_fit'] = 0.5  """

        # Skills relevance

        if application_skills:
            skills_emb = self.model.encode([application_skills])
            field_emb = self.model.encode([scholarship_requirements])
            scores['skills_relevance'] = cosine_similarity(skills_emb, field_emb)[0][0]
        else:
            scores['skills_relevance'] = 0.3

        return scores

    def calculate_final_score(self, hard_scores, academic_scores, semantic_scores):
        """Calculate weighted final score"""

        # Calculate component averages
        hard_avg = np.mean(list(hard_scores.values()))
        academic_avg = np.mean(list(academic_scores.values()))
        semantic_avg = np.mean(list(semantic_scores.values()))

        # Weighted combination
        final_score = (
            self.weights['hard_requirements'] * hard_avg +
            self.weights['academic_fit'] * academic_avg +
            self.weights['semantic_match'] * semantic_avg
        )

        return final_score


    def profile_scholarship_match(self, sch_id, top_k = 5):
        scores = []

        profile_list = self.query.get_profile(all=True)
        scholarship = self.query.get_scholarship(all=False, scholarship_id = sch_id)[0]

        for profile in profile_list:
            # Tier 1: Hard requirements (now scored, not eliminating)
            hard_results = self.check_hard_requirements(profile, scholarship)
            hard_scores = hard_results['scores']

            # Tier 2: Academic scoring
            academic_scores = self.score_academic_requirements(profile, scholarship)

            # Tier 3: Semantic matching
            semantic_scores = self.semantic_matching(profile, scholarship)

            # Calculate final score
            final_score = self.calculate_final_score(hard_scores, academic_scores, semantic_scores)

            # Determine eligibility based on score threshold

            scores.append({
                'profile': profile["id"],
                'overall_score': final_score,
                'warnings': hard_results['reasons'],  # Show warnings instead of blocking
                'details': {
                    'hard_requirements': hard_scores,
                    'academic_scores': academic_scores,
                    'semantic_scores': semantic_scores,
                    'breakdown': {
                        'hard_avg': np.mean(list(hard_scores.values())),
                        'academic_avg': np.mean(list(academic_scores.values())),
                        'semantic_avg': np.mean(list(semantic_scores.values()))
                    }
                }
            })

            scores.sort(key=lambda x: x["overall_score"], reverse=True)

        return scores[:top_k]


    def application_scholarship_match(self, sch_id, top_k = 5):
        """Main matching function"""

        scores = []

        applications_list = self.query.get_application_of_scholarship(sch_id)
        scholarship = self.query.get_scholarship(all=False, scholarship_id=sch_id)[0]

        for application in applications_list:

            # Tier 1: Hard requirements (now scored, not eliminating)
            hard_results = self.check_hard_requirements(application, scholarship)
            hard_scores = hard_results['scores']

            # Tier 2: Academic scoring
            academic_scores = self.score_academic_requirements(application, scholarship)

            # Tier 3: Semantic matching
            semantic_scores = self.semantic_matching(application, scholarship)

            # Calculate final score
            final_score = self.calculate_final_score(hard_scores, academic_scores, semantic_scores)



            scores.append({
                'application': application["id"],

                'overall_score': final_score,
                'warnings': hard_results['reasons'],  # Show warnings instead of blocking
                'details': {
                    'hard_requirements': hard_scores,
                    'academic_scores': academic_scores,
                    'semantic_scores': semantic_scores,
                    'breakdown': {
                        'hard_avg': np.mean(list(hard_scores.values())),
                        'academic_avg': np.mean(list(academic_scores.values())),
                        'semantic_avg': np.mean(list(semantic_scores.values()))
                    }
                }
            })

            scores.sort(key=lambda x: x["overall_score"], reverse=True)

        return scores[:top_k]

    def scholarship_profile_match(self, prof_id, top_k=5):
        """Main matching function"""

        profile = self.query.get_profile(all=False, profile_id=prof_id)[0]
        scholarship_list = self.query.get_scholarship(all=True)

        scores = []
        for scholarship in scholarship_list:
            # Tier 1: Hard requirements (now scored, not eliminating)
            hard_results = self.check_hard_requirements(profile, scholarship)
            hard_scores = hard_results['scores']

            # Tier 2: Academic scoring
            academic_scores = self.score_academic_requirements(profile, scholarship)

            # Tier 3: Semantic matching
            semantic_scores = self.semantic_matching(profile, scholarship)

            # Calculate final score
            final_score = self.calculate_final_score(hard_scores, academic_scores, semantic_scores)



            scores.append({
                'scholarship': scholarship["id"],
                'overall_score': final_score,
                'warnings': hard_results['reasons'],  # Show warnings instead of blocking
                'details': {
                    'hard_requirements': hard_scores,
                    'academic_scores': academic_scores,
                    'semantic_scores': semantic_scores,
                    'breakdown': {
                        'hard_avg': np.mean(list(hard_scores.values())),
                        'academic_avg': np.mean(list(academic_scores.values())),
                        'semantic_avg': np.mean(list(semantic_scores.values()))
                    }
                }
            })

            scores.sort(key=lambda x: x["overall_score"], reverse=True)

        return scores[:top_k]

    def llm_analyze(self, application_id, scholarship_id):

        application = self.query.get_profile(all=False, profile_id=application_id)[0]
        scholarship = self.query.get_scholarship(all=False, scholarship_id=scholarship_id)[0]

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
                # Configure Gemini
                genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
                model = genai.GenerativeModel('gemini-2.5-flash')

                # Generate response
                response = model.generate_content(prompt)

                # Parse JSON response
                response_text = response.text.strip()
                # Remove markdown code blocks if present
                if response_text.startswith('```'):
                    response_text = response_text.split('```')[1]
                    if response_text.startswith('json'):
                        response_text = response_text[4:]

                llm_analysis = json.loads(response_text)

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

    def _llm_compare_scholarships(self, profile_id, sch_id_list):
        """
        Use LLM to provide comparative analysis across scholarships
        """
        profile = self.query.get_profile(profile_id)
        scholaships_list = self.query.get_scholarships(sch_id_list)

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
            # Configure and call Gemini
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            model = genai.GenerativeModel('gemini-2.5-flash')

            # Retry logic
            max_retries = 3
            retry_delay = 2

            for attempt in range(max_retries):
                try:
                    print(f"🤖 Calling LLM for comparative analysis...")
                    response = model.generate_content(prompt)
                    break
                except Exception as api_error:
                    error_str = str(api_error)
                    if '429' in error_str or 'quota' in error_str.lower():
                        if attempt < max_retries - 1:
                            wait_time = retry_delay * (2 ** attempt)
                            print(f"⏳ Rate limit hit. Retrying in {wait_time}s...")
                            import time
                            time.sleep(wait_time)
                        else:
                            raise api_error
                    else:
                        raise api_error

            # Parse response
            response_text = response.text.strip()
            if response_text.startswith('```'):
                response_text = response_text.split('```')[1]
                if response_text.startswith('json'):
                    response_text = response_text[4:]

            comparison_analysis = json.loads(response_text)

            result = {
                'success': True,
                'analysis': comparison_analysis
            }

            return result

        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'analysis': None
                }