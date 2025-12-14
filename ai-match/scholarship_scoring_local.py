from profile_scoring_local import ProfileScoringEngineLocal
from utils import extract_json

class ScholarshipSoftScoringEngineLocal(ProfileScoringEngineLocal):
    def __init__(self, data, embedding_model, llm, major_w=0.2, skills_w=0.2, research_w=0.1, experience_w=0.2, career_w=0.1, education_w=0.1, intentions_w=0.1):
        super().__init__(
            data, embedding_model, llm,
            experience_w=experience_w, 
            career_w=career_w, 
            education_w=education_w, 
            intentions_w=intentions_w,
            major_w=major_w, 
            skills_w=skills_w, 
            research_w=research_w
        )
        self.data = data
        self.scholarships = data.get("scholarships", [])
        self.profile = data.get("profile")

        # Priority: 1. Weights in applicantPreference, 2. Arguments (defaults/top-level)
        pref_weights = self.profile
        self.experience_w = pref_weights.get("experience_w", experience_w)
        self.career_w = pref_weights.get("career_w", career_w)
        self.education_w = pref_weights.get("education_w", education_w)
        self.intentions_w = pref_weights.get("intentions_w", intentions_w)

        self.major_w = pref_weights.get("major_w", major_w)
        self.skills_w = pref_weights.get("skills_w", skills_w)
        self.research_w = pref_weights.get("research_w", research_w)

    # check_weight removed as per user request for flexibility


    def get_top_scholarships(self, top_k=5):
        scores = []
        for sch in self.scholarships:
            s = self.fast_soft_score(sch)
            scores.append((sch, s))

        scores.sort(key=lambda x: x[1]["soft_score"], reverse=True)
        return scores[:top_k]

    def fast_soft_score(self, scholarship):

        major = self.score_major(
            self.profile.get("preferredMajor") or "",
            scholarship.get("requiredMajor") or ""
        )
        
        profile_skills = ""
        for skill in self.profile.get("skills") or "":
            profile_skills += skill["skillName"] + ", "

        skills = self.score_skills(
            profile_skills,
            scholarship.get("requirements") or ""
        )

        research = self.score_research_interest(
            self.profile.get("researchInterest") or "",
            scholarship.get("fields") or ""
        ) 

        return {
            "major": major,
            "skills": skills,
            "research": research,
            "soft_score": self.major_w * major + self.skills_w * skills + self.research_w * research
        }

    def final_ranking(self, top_scholarships):
        results = []

        for sch, fast_score in top_scholarships:
            llm = self.llm_scoring(self.profile, sch)

            final = fast_score["soft_score"] + llm["overall_soft_score"]

            results.append({
                "scholarship_id": sch["id"],
                "cosine": fast_score,
                "llm_score": llm,
                "final_score": final
            })

        results.sort(key=lambda x: x["final_score"], reverse=True)
        return results

    def match_scholarships(self, top_k=10):
        top = self.get_top_scholarships(top_k=top_k)
        final = self.final_ranking(top)
        return final

    
