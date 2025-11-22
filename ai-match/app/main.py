"""FastAPI application for AI Match."""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import Dict, Any

from app.config import get_settings, Settings
from app.database import get_both_cursors
from app.models import (
    ScholarshipSearchRequest,
    ApplicantSearchRequest,
    ApplicationRankRequest,
    AnalyzeRequest,
    ScholarshipSearchResponse,
    ApplicantSearchResponse,
    ApplicationRankResponse,
    AnalyzeResponse,
    HealthResponse
)
from app.services.embedding_service import (
    scholarships_search,
    applicant_search,
    application_search,
    get_embedding_model
)
from app.services.llm_service import llm_analyze


# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup: Pre-load embedding model
    print("Loading embedding model...")
    get_embedding_model()
    print("Embedding model loaded successfully!")
    
    yield
    
    # Shutdown: cleanup if needed
    print("Shutting down...")


# Create FastAPI app
app = FastAPI(
    title="AI Match API",
    description="AI-powered scholarship matching system using embeddings and LLM analysis",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Info"])
async def root():
    """API information."""
    return {
        "message": "Welcome to AI Match API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check(settings: Settings = Depends(get_settings)):
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        embedding_model=settings.embedding_model_name
    )


@app.post("/api/v1/scholarships/search", response_model=ScholarshipSearchResponse, tags=["Scholarships"])
async def search_scholarships(request: ScholarshipSearchRequest):
    """
    Search for scholarships matching an applicant's profile.
    
    Returns top K scholarships ranked by similarity score.
    """
    try:
        with get_both_cursors() as (sch_cursor, prof_cursor):
            results = scholarships_search(
                applicant_id=request.applicant_id,
                sch_cursor=sch_cursor,
                prof_cursor=prof_cursor,
                top_k=request.top_k
            )
        
        return ScholarshipSearchResponse(
            results=results,
            count=len(results)
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/api/v1/applicants/search", response_model=ApplicantSearchResponse, tags=["Applicants"])
async def search_applicants(request: ApplicantSearchRequest):
    """
    Search for applicants matching a scholarship.
    
    Returns top K applicants ranked by similarity score.
    """
    try:
        with get_both_cursors() as (sch_cursor, prof_cursor):
            results = applicant_search(
                scholarship_id=request.scholarship_id,
                sch_cursor=sch_cursor,
                prof_cursor=prof_cursor,
                top_k=request.top_k
            )
        
        return ApplicantSearchResponse(
            results=results,
            count=len(results)
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/api/v1/applications/rank", response_model=ApplicationRankResponse, tags=["Applications"])
async def rank_applications(request: ApplicationRankRequest):
    """
    Rank applications for a specific scholarship.
    
    Returns top K applications ranked by similarity score.
    """
    try:
        with get_both_cursors() as (sch_cursor, _):
            results = application_search(
                scholarship_id=request.scholarship_id,
                sch_cursor=sch_cursor,
                top_k=request.top_k
            )
        
        return ApplicationRankResponse(
            results=results,
            count=len(results)
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/api/v1/analyze", response_model=AnalyzeResponse, tags=["Analysis"])
async def analyze_match(request: AnalyzeRequest):
    """
    Analyze the match between an applicant and a scholarship using LLM.
    
    Returns detailed analysis including:
    - Match reasons
    - Student strengths
    - Areas for improvement
    - Application tips
    - Overall strategy
    - Timeline
    """
    try:
        with get_both_cursors() as (sch_cursor, prof_cursor):
            analysis = llm_analyze(
                applicant_id=request.applicant_id,
                scholarship_id=request.scholarship_id,
                sch_cursor=sch_cursor,
                prof_cursor=prof_cursor
            )
        
        return AnalyzeResponse(analysis=analysis)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
