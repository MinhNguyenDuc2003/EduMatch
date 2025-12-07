from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
from dotenv import load_dotenv

# Use relative import since we're in the app package
from app.scholarship_matcher import ScholarshipMatcher

load_dotenv()

app = FastAPI(title="Scholarship Matcher API")

# Global instance
matcher = None

import numpy as np

def convert_to_json_serializable(obj):
    """Convert numpy types to native Python types"""
    if isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.bool_):
        return bool(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, dict):
        return {key: convert_to_json_serializable(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_to_json_serializable(item) for item in obj]
    elif isinstance(obj, tuple):
        return tuple(convert_to_json_serializable(item) for item in obj)
    return obj

@app.on_event("startup")
async def startup_event():
    global matcher
    print("=" * 50)
    print("🚀 Starting Scholarship Matcher API...")
    print("=" * 50)
    try:
        matcher = ScholarshipMatcher()
        print("=" * 50)
        print("✅ ScholarshipMatcher initialized successfully")
        print("=" * 50)
    except Exception as e:
        print("=" * 50)
        print(f"❌ Error initializing ScholarshipMatcher: {e}")
        print("=" * 50)
        import traceback
        traceback.print_exc()
        # Don't raise - let API start even if matcher fails
        # This allows health check endpoint to work

@app.get("/")
def read_root():
    return {
        "message": "Scholarship Matcher API is running",
        "status": "active" if matcher else "error",
        "endpoints": {
            "docs": "/docs",
            "profile_match": "/match/profile/{profile_id}",
            "scholarship_applications": "/match/scholarship/{scholarship_id}/applications",
            "scholarship_profiles": "/match/scholarship/{scholarship_id}/profiles",
            "llm_analysis": "/analyze/llm"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    if not matcher:
        raise HTTPException(status_code=503, detail="Matcher service not initialized")
    
    try:
        # Check if database connections are active
        is_connected = matcher.query.is_connected()
        return {
            "status": "healthy" if is_connected else "unhealthy",
            "database": "connected" if is_connected else "disconnected"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Health check failed: {str(e)}")

@app.get("/match/profile/{profile_id}")
def match_profile_to_scholarships(profile_id: int, top_k: int = 5):
    """
    Match a profile to all scholarships.
    Returns top K scholarships ranked by match score.
    """
    if not matcher:
        raise HTTPException(status_code=503, detail="Matcher service not initialized")
    
    try:
        results = matcher.scholarship_profile_match(profile_id, top_k)
        return {
            "profile_id": profile_id,
            "top_k": top_k,
            "matches": convert_to_json_serializable(results)
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/match/scholarship/{scholarship_id}/applications")
def match_scholarship_to_applications(scholarship_id: int, top_k: int = 5):
    """
    Match a scholarship to all its applications.
    Returns top K applications ranked by match score.
    """
    if not matcher:
        raise HTTPException(status_code=503, detail="Matcher service not initialized")
    
    try:
        results = matcher.application_scholarship_match(scholarship_id, top_k)
        return {
            "scholarship_id": scholarship_id,
            "top_k": top_k,
            "matches": convert_to_json_serializable(results)
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/match/scholarship/{scholarship_id}/profiles")
def match_scholarship_to_profiles(scholarship_id: int, top_k: int = 5):
    """
    Match a scholarship to all profiles (potential candidates).
    Returns top K profiles ranked by match score.
    """
    if not matcher:
        raise HTTPException(status_code=503, detail="Matcher service not initialized")
    
    try:
        results = matcher.profile_scholarship_match(scholarship_id, top_k)
        return {
            "scholarship_id": scholarship_id,
            "top_k": top_k,
            "matches": convert_to_json_serializable(results)
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

class LLMAnalysisRequest(BaseModel):
    application_id: int
    scholarship_id: int

class LLMCompareRequest(BaseModel):
    profile_id: int
    scholarship_id_list: list[int]
    
@app.post("/analyze/llm")
def analyze_match_with_llm(request: LLMAnalysisRequest):
    """
    Analyze the match between an application and a scholarship using LLM.
    Provides detailed recommendations and improvement suggestions.
    """
    if not matcher:
        raise HTTPException(status_code=503, detail="Matcher service not initialized")
    
    try:
        result = matcher.llm_analyze(request.application_id, request.scholarship_id)
        if not result.get('success'):
            raise HTTPException(status_code=500, detail=result.get('error', 'Unknown error'))
        return result
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/compare/llm")
def compare_scholarships_with_llm(request: LLMCompareRequest):
    """
    Compare multiple scholarships for a profile using LLM.
    Provides detailed recommendations and improvement suggestions.
    """
    if not matcher:
        raise HTTPException(status_code=503, detail="Matcher service not initialized")
    
    try:
        result = matcher._llm_compare_scholarships(request.profile_id, request.scholarship_id_list)
        if not result.get('success'):
            raise HTTPException(status_code=500, detail=result.get('error', 'Unknown error'))
        return result
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)