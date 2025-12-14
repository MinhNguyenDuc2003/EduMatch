from soft_scoring import SoftScoringEngine
from transformers import pipeline
from utils import extract_json

class ApplicationSoftScoringEngineLocal(SoftScoringEngine):

    def __init__(self, data, embedding_model, llm_model, career_w=0.2, personal_statement_w=0.2, motivation_w=0.1, major_w=0.2, skills_w=0.2, research_w=0.1, achievements_w=0.02, extracurricular_w=0.02):
        super().__init__(embedding_model, llm_model, major_w, skills_w, research_w)

        self.data = data
        self.applications = data.get("applications", [])
        self.scholarship = data.get("scholarship")
        
        # Priority: 1. Weights in scholarshipPreference, 2. Arguments (defaults/top-level)
        pref_weights = data.get("scholarshipPreference")
        
        # Mapping alternative keys
        self.career_w = pref_weights.get("career_w", career_w)
        self.personal_statement_w = pref_weights.get("personal_statement_w", personal_statement_w)
        self.motivation_w = pref_weights.get("motivation_w", motivation_w)
        self.major_w = pref_weights.get("major_w", major_w)
        self.skills_w = pref_weights.get("skills_w", skills_w)
        self.research_w = pref_weights.get("research_w", research_w)
        self.achievements_w = pref_weights.get("achievements_w", achievements_w)
        self.extracurricular_w = pref_weights.get("extracurricular_w", extracurricular_w)

    # check_weight removed as per user request for flexibility


    def llm_scoring(self, application):
        application_motivation = application.get("motivation") or ""
        application_personal_statement = application.get("personalStatement") or ""
        application_achievements = application.get("achievements") or ""
        application_extracurricular = application.get("extracurricular") or ""
        application_career_goal = application.get("careerGoal") or ""

        scholarship_description = self.scholarship.get("description") or ""
        scholarship_fields = self.scholarship.get("fields") or ""
        scholarship_benefits = self.scholarship.get("benefits") or ""

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
Motivation:
{application_motivation}

Personal Statement:
{application_personal_statement}

Achievements:
{application_achievements}

Extracurricular Activities:
{application_extracurricular}

Career Goal:
{application_career_goal}

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

1. Motivation Fit with scholarship description and fields
   - Score based on how clearly motivation aligns with scholarship description and fields ().

2. Personal Statement Fit
   - Score meaning, clarity, alignment — not writing beauty.

3. Achievement Relevance  
   - Score high ONLY if achievements are directly related to the scholarship's field or expectations.

4. Extracurricular Alignment  
   - Score high ONLY if activities show domain relevance or leadership aligned with scholarship theme.

5. Career Goal Alignment fit with scholarship benefits 
   - MUST connect directly to scholarship benefits or long-term mission to score above 0.7.

6. Overall Soft-Fit Score  
   - Should follow the strict scale above.
   - Not an average — your expert judgment of alignment.

====================================================
STRICT OUTPUT FORMAT
====================================================

Return ONLY a JSON object with THIS EXACT structure:

{{
  "motivation_score": 0.0,
  "statement_score": 0.0,
  "career_score": 0.0,
  "achievement_score": 0.0,
  "extracurricular_score": 0.0,
}}

Rules:
- All numbers must be between 0 and 1.
- Use strict scoring (0.8–1.0 ONLY for truly exceptional alignment).
- Output valid JSON only.
- Just return the JSON object with point no explanation, no markdown, no comments.
- Use available information, do not invent anything.
- Do not say anything else.
"""
        response = self.llm.generate_content(prompt)

        data = extract_json(response.text)

        if data is None:
            data = {
                "motivation_score": 0,
                "statement_score": 0,
                "career_score": 0,
                "achievement_score": 0,
                "extracurricular_score": 0,
                "overall_soft_score": 0
               }
        
        data["overall_soft_score"] = (
            self.career_w * data["career_score"] + 
            self.personal_statement_w * data["statement_score"] + 
            self.motivation_w * data["motivation_score"] + 
            data["achievement_score"] * self.achievements_w + 
            data["extracurricular_score"] * self.extracurricular_w
        )

        return data

    def fast_soft_score(self, application):
        major = self.score_major(
            application.get("major") or "",
            self.scholarship.get("requiredMajor") or ""
            )

        skills = self.score_skills(
            application.get("skills") or "",
            self.scholarship.get("requirements") or ""
            )

        research = self.score_research_interest(
            application.get("researchInterest") or "",
            self.scholarship.get("fields") or ""
            )

        return {
            "major": major,
            "skills": skills,
            "research": research,
            "soft_score": self.major_w * major + self.skills_w * skills + self.research_w * research
        }

    def get_top_candidates(self, top_k=5):
        scores = []
        for app in self.applications:
            s = self.fast_soft_score(app)
            scores.append((app, s))

        scores.sort(key=lambda x: x[1]["soft_score"], reverse=True)
        return scores[:top_k]

    def final_ranking(self, top_candidates):
        results = []

        for app, fast_score in top_candidates:
            llm = self.llm_scoring(app)

            final = fast_score["soft_score"] + llm["overall_soft_score"]

            results.append({
                "application_id": app["id"],
                "cosine": fast_score,
                "llm": llm,
                "final_score": final
            })

        results.sort(key=lambda x: x["final_score"], reverse=True)
        return results

    def match_applications(self, top_k=10):
        top = self.get_top_candidates(top_k=top_k)
        final = self.final_ranking(top)
        return final
