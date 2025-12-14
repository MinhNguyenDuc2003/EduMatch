from soft_scoring import SoftScoringEngine
from utils import extract_json

class ProfileScoringEngineLocal(SoftScoringEngine):
    def __init__(self, data, embedding_model, llm, experience_w=0.2, career_w=0.1, education_w=0.1, intentions_w=0.1, major_w=0.2, skills_w=0.2, research_w=0.1):
        super().__init__(embedding_model, llm, major_w, skills_w, research_w)
        self.data = data
        self.profiles = data.get("profiles", [])
        self.scholarship = data.get("scholarship")

        # Priority: 1. Weights in scholarshipPreference, 2. Arguments (defaults/top-level)
        pref_weights = data.get("scholarshipPreference", {})
        self.experience_w = pref_weights.get("experience_w", experience_w)
        self.career_w = pref_weights.get("career_w", career_w)
        self.education_w = pref_weights.get("education_w", education_w)
        self.intentions_w = pref_weights.get("intentions_w", intentions_w)

        self.major_w = pref_weights.get("major_w", major_w)
        self.skills_w = pref_weights.get("skills_w", skills_w)
        self.research_w = pref_weights.get("research_w", research_w)

    # check_weight removed as per user request for flexibility
    
    def llm_scoring(self, profile, scholarship):
        profile_experience = profile.get("researchExperience", "")
        profile_achievements = profile.get("academicAwards", "")
        profile_extracurricular = profile.get("extracurricularActivities", "")
        profile_career_goal = profile.get("careerGoals", "")
        profile_education_histories = ""
        for history in profile.get("educationHistories", []):
            profile_education_histories += history.get("majorName", "") + ", "
        profile_intentions = ""
        for intent in profile.get("intentions", []):
            profile_intentions += intent.get("intendedMajorName", "") + ", "

        scholarship_description = scholarship.get("description") or ""
        scholarship_fields = scholarship.get("fields") or ""
        scholarship_benefits = scholarship.get("benefits") or ""


        prompt = f"""
You are an expert scholarship evaluation system. 
Your task is to generate a SOFT-FIT score for an applicant compared to a scholarship.
Focus ONLY on meaning, relevance, intent, motivation, and semantic alignment.

CRITICAL RULE:
If the applicant's motivation or personal statement is in a different academic field
than the scholarship fields, you MUST cap the corresponding score at 0.5.
Do NOT give high scores for general motivation, leadership, or passion if the field
does not match.

====================================================
APPLICANT INFORMATION
====================================================
Experience:
{profile_experience}

Career Goal:
{profile_career_goal}

Education Histories:
{profile_education_histories}

Intentions:
{profile_intentions}

Achievements:
{profile_achievements}

Extracurricular Activities:
{profile_extracurricular}


====================================================
SCHOLARSHIP INFORMATION
====================================================
Description:
{scholarship_description}

Fields / Areas of Study:
{scholarship_fields}


Benefits / Direction:
{scholarship_benefits}

====================================================
SCORING GUIDELINES (VERY IMPORTANT)
====================================================

You must score VERY STRICTLY.

Use this scale:

- 0.0–0.3  : very weak or low alignment  
- 0.3–0.6  : weak alignment  
- 0.6–0.8  : quite alignment  
- 0.8–1.0  : strong alignment, given ONLY if the applicant's content clearly matches the scholarship's field, mission, and direction in a highly specific way.  
This top range should be RARE and only used when match is extremely strong.

Scoring criteria:

1. Experience Fit with scholarship description and fields
   - Score based on how clearly experience aligns with scholarship description and fields.

2. Achievement Relevance  
   - Score high ONLY if achievements are directly related to the scholarship's field or expectations.

3. Extracurricular Alignment  
   - Score high ONLY if activities show domain relevance or leadership aligned with scholarship theme.

4. Certificate Alignment  
   - Score high ONLY if certificates show domain relevance or leadership aligned with scholarship theme.

5. Career Goal Alignment fit with scholarship benefits 
   - MUST connect directly to scholarship benefits or long-term mission to score above 0.7.

6. Education History Alignment fit with scholarship fields
   - Score based on how clearly education history aligns with scholarship fields.

7. Intentions Alignment fit with scholarship benefits
   - Score based on how clearly intentions align with scholarship benefits and fields.

8. Overall Soft-Fit Score  
   - Should follow the strict scale above.

====================================================
STRICT OUTPUT FORMAT
====================================================

Return ONLY a JSON object with THIS EXACT structure:

{{
  "experience_score": 0.0,
  "career_score": 0.0,
  "education_score": 0.0,
  "intentions_score": 0.0,
  "certificate_score": 0.0,
  "achievement_score": 0.0,
  "extracurricular_score": 0.0,
}}

Rules:
- All numbers must be between 0.3 and 1.
- Use strict scoring (0.8–1.0 ONLY for truly exceptional alignment).
- Output valid JSON only.
- Just return the JSON object with point no explanation, no markdown, no comments.
- Do not say anything else.
"""
        response = self.llm.generate_content(prompt)

        data = extract_json(response.text)

        if data is None:
            return {
                "experience_score": 0,
                "career_score": 0,
                "education_score": 0,
                "intentions_score": 0,
                "achievement_score": 0,
                "extracurricular_score": 0,
                "overall_soft_score": 0
               }

        llm_score =  {
            "experience_score": data.get("experience_score", 0),
            "career_score": data.get("career_score", 0),
            "education_score": data.get("education_score", 0),
            "intentions_score": data.get("intentions_score", 0),
            "achievement_score": data.get("achievement_score", 0),
            "extracurricular_score": data.get("extracurricular_score", 0),
            "overall_soft_score": self.experience_w * data["experience_score"] + self.career_w * data["career_score"] + self.education_w * data["education_score"] + self.intentions_w * data["intentions_score"] + data["achievement_score"]*0.02 + data["extracurricular_score"]*0.02 
        }

        return llm_score


    def fast_soft_score(self, profile):

        major = self.score_major(
            profile.get("preferredMajor") or "",
            self.scholarship.get("requiredMajor") or ""
        )
        
        profile_skills = ""
        for skill in profile.get("skills") or "":
            profile_skills += skill["skillName"] + ", "

        skills = self.score_skills(
            profile_skills,
            self.scholarship.get("requirements") or ""
        )

        research = self.score_research_interest(
            profile.get("researchInterest") or "",
            self.scholarship.get("fields") or ""
        )  

        return {
            "major": major,
            "skills": skills,
            "research": research,
            "soft_score": self.major_w * major + self.skills_w * skills + self.research_w * research
        }
        
    def get_top_profile(self, top_k=5):
        scores = []
        for prof in self.profiles:
            s = self.fast_soft_score(prof)
            scores.append((prof, s))

        scores.sort(key=lambda x: x[1]["soft_score"], reverse=True)
        return scores[:top_k]

    def final_ranking(self, top_profiles):
        results = []

        for prof, fast_score in top_profiles:
            llm = self.llm_scoring(prof, self.scholarship)

            final = fast_score["soft_score"] + llm["overall_soft_score"]

            results.append({
                "profile_id": prof['id'],
                "cosine": fast_score,
                "llm_score": llm,
                "final_score": final
            })

        results.sort(key=lambda x: x["final_score"], reverse=True)
        return results

    def match_profile(self, top_k=10):
        top = self.get_top_profile(top_k=top_k)
        final = self.final_ranking(top)
        return final
