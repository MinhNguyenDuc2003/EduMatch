from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn

from application_scoring_local import ApplicationSoftScoringEngineLocal
from scholarship_scoring_local import ScholarshipSoftScoringEngineLocal
from profile_scoring_local import ProfileScoringEngineLocal
from llm_analyze import ScholarshipLLMAnalyzer
from model import embedding_model, gemini_model

app = FastAPI(title="Scholarship Scoring API")

# --- Request Models ---

class ApplicationScoringRequest(BaseModel):
    applications: List[Dict[str, Any]]
    scholarshipPreference: Dict[str, Any]
    scholarship: Dict[str, Any]
    career_w: float = 0.2
    personal_statement_w: float = 0.2
    motivation_w: float = 0.1   
    major_w: float = 0.2
    skills_w: float = 0.2
    research_w: float = 0.1

class ScholarshipScoringRequest(BaseModel):
    scholarships: List[Dict[str, Any]]
    applicantPreference: Dict[str, Any]
    profile: Dict[str, Any]
    career_w: float = 0.1
    education_w: float = 0.1
    intentions_w: float = 0.1
    experience_w: float = 0.2
    major_w: float = 0.2
    skills_w: float = 0.2
    research_w: float = 0.1

class ProfileScoringRequest(BaseModel):
    profiles: List[Dict[str, Any]]
    scholarshipPreference: Dict[str, Any]
    scholarship: Dict[str, Any]
    career_w: float = 0.1
    education_w: float = 0.1
    intentions_w: float = 0.1
    experience_w: float = 0.2
    major_w: float = 0.2
    skills_w: float = 0.2
    research_w: float = 0.1

class AnalyzeScholarshipRequest(BaseModel):
    application: Dict[str, Any]
    scholarship: Dict[str, Any]

class CompareScholarshipsRequest(BaseModel):
    profile: Dict[str, Any]
    scholarships: List[Dict[str, Any]]

# --- Endpoints ---

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Service is running"}

@app.post("/score/applications")
def score_applications(request: ApplicationScoringRequest):
    """
    Score a list of applications against a scholarship preference.
    """
    try:
        data = request.dict()
        engine = ApplicationSoftScoringEngineLocal(
            data, 
            embedding_model, 
            gemini_model, 
            career_w=request.scholarshipPreference.get("career_w", 0.2), 
            personal_statement_w=request.scholarshipPreference.get("personal_statement_w", 0.2), 
            motivation_w=request.scholarshipPreference.get("motivation_w", 0.1), 
            major_w=request.scholarshipPreference.get("major_w", 0.2), 
            skills_w=request.scholarshipPreference.get("skills_w", 0.2), 
            research_w=request.scholarshipPreference.get("research_w", 0.1)
        )
        result = engine.match_applications()
        return {"results": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/score/scholarships")
def score_scholarships(request: ScholarshipScoringRequest):
    """
    Score a list of scholarships against an applicant profile (preference).
    """
    try:
        data = request.dict()
        data = request.dict()
        engine = ScholarshipSoftScoringEngineLocal(
            data, 
            embedding_model, 
            gemini_model,
            experience_w=request.applicantPreference.get("experience_w", 0.2), 
            career_w=request.applicantPreference.get("career_w", 0.1), 
            education_w=request.applicantPreference.get("education_w", 0.1), 
            intentions_w=request.applicantPreference.get("intentions_w", 0.1), 
            major_w=request.applicantPreference.get("major_w", 0.2), 
            skills_w=request.applicantPreference.get("skills_w", 0.2), 
            research_w=request.applicantPreference.get("research_w", 0.1)
        )
        result = engine.match_scholarships()
        return {"results": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/score/profiles")
def score_profiles(request: ProfileScoringRequest):
    """
    Score a list of profiles against a scholarship preference.
    """
    try:
        data = request.dict()
        engine = ProfileScoringEngineLocal(
            data, 
            embedding_model, 
            gemini_model,
            experience_w=request.scholarshipPreference.get("experience_w", 0.2), 
            career_w=request.scholarshipPreference.get("career_w", 0.1), 
            education_w=request.scholarshipPreference.get("education_w", 0.1), 
            intentions_w=request.scholarshipPreference.get("intentions_w", 0.1), 
            major_w=request.scholarshipPreference.get("major_w", 0.2), 
            skills_w=request.scholarshipPreference.get("skills_w", 0.2), 
            research_w=request.scholarshipPreference.get("research_w", 0.1)
        )
        result = engine.match_profile()
        return {"results": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/scholarship")
def analyze_scholarship(request: AnalyzeScholarshipRequest):
    """
    Detailed LLM analysis of a single scholarship match.
    """
    try:
        analyzer = ScholarshipLLMAnalyzer()
        result = analyzer.analyze_scholarship(request.application, request.scholarship)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/compare")
def compare_scholarships(request: CompareScholarshipsRequest):
    """
    Comparative analysis of multiple scholarships for a profile.
    """
    try:
        analyzer = ScholarshipLLMAnalyzer()
        result = analyzer.compare_scholarships(request.profile, request.scholarships)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
