"""FastAPI application for AI Match."""
import logging
import sys
import traceback
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    settings = get_settings()
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Debug mode: {settings.debug}")
    
    # Startup: Pre-load embedding model
    try:
        logger.info("Loading embedding model...")
        get_embedding_model()
        logger.info("✓ Embedding model loaded successfully!")
    except Exception as e:
        logger.error(f"✗ Failed to load embedding model: {e}")
        logger.error(traceback.format_exc())
        raise
    
    # Test database connections
    try:
        logger.info("Testing database connections...")
        with get_both_cursors() as (sch_cursor, prof_cursor):
            sch_cursor.execute("SELECT 1")
            prof_cursor.execute("SELECT 1")
        logger.info("✓ Database connections successful!")
    except Exception as e:
        logger.error(f"✗ Database connection failed: {e}")
        logger.error(traceback.format_exc())
        raise
    
    yield
    
    # Shutdown: cleanup if needed
    logger.info("Shutting down...")


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


# Global exception handler for debugging
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Catch all unhandled exceptions and log them."""
    logger.error(f"Unhandled exception on {request.method} {request.url}")
    logger.error(f"Exception type: {type(exc).__name__}")
    logger.error(f"Exception message: {str(exc)}")
    logger.error(f"Full traceback:\n{traceback.format_exc()}")
    
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "error": str(exc),
            "type": type(exc).__name__,
            "path": str(request.url)
        }
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
    """Health check endpoint with database connection test."""
    try:
        # Test database connections
        with get_both_cursors() as (sch_cursor, prof_cursor):
            sch_cursor.execute("SELECT 1")
            prof_cursor.execute("SELECT 1")
        
        logger.info("Health check passed")
        return HealthResponse(
            status="healthy",
            version="1.0.0",
            embedding_model=settings.embedding_model_name
        )
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=503,
            detail=f"Service unhealthy: Database connection failed - {str(e)}"
        )



@app.post("/api/v1/scholarships/search", response_model=ScholarshipSearchResponse, tags=["Scholarships"])
async def search_scholarships(request: ScholarshipSearchRequest):
    """
    Search for scholarships matching an applicant's profile.
    
    Returns top K scholarships ranked by similarity score.
    """
    logger.info(f"Scholarship search request: applicant_id={request.applicant_id}, top_k={request.top_k}")
    try:
        with get_both_cursors() as (sch_cursor, prof_cursor):
            results = scholarships_search(
                applicant_id=request.applicant_id,
                sch_cursor=sch_cursor,
                prof_cursor=prof_cursor,
                top_k=request.top_k
            )
        
        logger.info(f"Scholarship search completed: {len(results)} results")
        return ScholarshipSearchResponse(
            results=results,
            count=len(results)
        )
    except ValueError as e:
        logger.warning(f"Scholarship search failed: {e}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Scholarship search error: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/api/v1/applicants/search", response_model=ApplicantSearchResponse, tags=["Applicants"])
async def search_applicants(request: ApplicantSearchRequest):
    """
    Search for applicants matching a scholarship.
    
    Returns top K applicants ranked by similarity score.
    """
    logger.info(f"Applicant search request: scholarship_id={request.scholarship_id}, top_k={request.top_k}")
    try:
        with get_both_cursors() as (sch_cursor, prof_cursor):
            results = applicant_search(
                scholarship_id=request.scholarship_id,
                sch_cursor=sch_cursor,
                prof_cursor=prof_cursor,
                top_k=request.top_k
            )
        
        logger.info(f"Applicant search completed: {len(results)} results")
        return ApplicantSearchResponse(
            results=results,
            count=len(results)
        )
    except ValueError as e:
        logger.warning(f"Applicant search failed: {e}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Applicant search error: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.post("/api/v1/applications/rank", response_model=ApplicationRankResponse, tags=["Applications"])
async def rank_applications(request: ApplicationRankRequest):
    """
    Rank applications for a specific scholarship.
    
    Returns top K applications ranked by similarity score.
    """
    logger.info(f"Application rank request: scholarship_id={request.scholarship_id}, top_k={request.top_k}")
    try:
        with get_both_cursors() as (sch_cursor, _):
            results = application_search(
                scholarship_id=request.scholarship_id,
                sch_cursor=sch_cursor,
                top_k=request.top_k
            )
        
        logger.info(f"Application rank completed: {len(results)} results")
        return ApplicationRankResponse(
            results=results,
            count=len(results)
        )
    except ValueError as e:
        logger.warning(f"Application rank failed: {e}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Application rank error: {e}")
        logger.error(traceback.format_exc())
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
    logger.info(f"LLM analysis request: applicant_id={request.applicant_id}, scholarship_id={request.scholarship_id}")
    try:
        with get_both_cursors() as (sch_cursor, prof_cursor):
            analysis = llm_analyze(
                applicant_id=request.applicant_id,
                scholarship_id=request.scholarship_id,
                sch_cursor=sch_cursor,
                prof_cursor=prof_cursor
            )
        
        logger.info(f"LLM analysis completed successfully")
        return AnalyzeResponse(analysis=analysis)
    except ValueError as e:
        logger.warning(f"LLM analysis failed: {e}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"LLM analysis error: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
