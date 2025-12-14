from application_scoring_local import ApplicationSoftScoringEngineLocal
from scholarship_scoring_local import ScholarshipSoftScoringEngineLocal
from profile_scoring_local import ProfileScoringEngineLocal
from llm_analyze import ScholarshipLLMAnalyzer
from model import embedding_model, gemini_model
import json

with open("profile.txt", "r", encoding="utf-8") as f:
    profiles = json.load(f)

with open("scholarship.txt", "r", encoding="utf-8") as f:
    scholarships = json.load(f)

with open("application.txt", "r", encoding="utf-8") as f:
    applications = json.load(f)

if __name__ == "__main__":
    #app_scoring = ApplicationSoftScoringEngineLocal(applications, embedding_model, gemini_model)
    sch_scoring = ScholarshipSoftScoringEngineLocal(scholarships, embedding_model, gemini_model)
    #prof_scoring = ProfileScoringEngineLocal(profiles, embedding_model, gemini_model)

    #score1 = app_scoring.match_applications()
    score2 = sch_scoring.match_scholarships()
    #score3 = prof_scoring.match_profile()

    #print(score1)
    print(score2)
    #print(score3)
    
    #profile = profiles['profiles'][0]
    #scholarship = scholarships['scholarships'][0]
    #scholarship_list = [scholarships['scholarships'][0], scholarships['scholarships'][1]]


    #llm_analyze = ScholarshipLLMAnalyzer()
    #a = llm_analyze.analyze_scholarship(profile, scholarship)
    #b = llm_analyze.compare_scholarships(profile, scholarship_list)
    #print(a)
    #print(b)    
