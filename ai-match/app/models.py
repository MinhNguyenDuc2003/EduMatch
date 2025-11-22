"""Pydantic models for request/response validation."""
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional


class ScholarshipSearchRequest(BaseModel):
    """Request model for searching scholarships for an applicant."""
    applicant_id: int = Field(..., description="ID of the applicant")
    top_k: int = Field(5, ge=1, le=20, description="Number of top results to return")


class ApplicantSearchRequest(BaseModel):
    """Request model for searching applicants for a scholarship."""
    scholarship_id: int = Field(..., description="ID of the scholarship")
    top_k: int = Field(5, ge=1, le=20, description="Number of top results to return")


class ApplicationRankRequest(BaseModel):
    """Request model for ranking applications for a scholarship."""
    scholarship_id: int = Field(..., description="ID of the scholarship")
    top_k: int = Field(5, ge=1, le=20, description="Number of top results to return")


class AnalyzeRequest(BaseModel):
    """Request model for LLM analysis."""
    applicant_id: int = Field(..., description="ID of the applicant")
    scholarship_id: int = Field(..., description="ID of the scholarship")


class MatchResult(BaseModel):
    """Match result with similarity score."""
    id: int
    similarity_score: float


class ScholarshipMatchResult(MatchResult):
    """Scholarship match result."""
    scholarship_id: int = Field(..., alias="id")

    class Config:
        populate_by_name = True


class ApplicantMatchResult(MatchResult):
    """Applicant match result."""
    applicant_id: int = Field(..., alias="id")

    class Config:
        populate_by_name = True


class ApplicationMatchResult(MatchResult):
    """Application match result."""
    application_id: int = Field(..., alias="id")

    class Config:
        populate_by_name = True


class ScholarshipSearchResponse(BaseModel):
    """Response model for scholarship search."""
    results: List[Dict[str, Any]]
    count: int


class ApplicantSearchResponse(BaseModel):
    """Response model for applicant search."""
    results: List[Dict[str, Any]]
    count: int


class ApplicationRankResponse(BaseModel):
    """Response model for application ranking."""
    results: List[Dict[str, Any]]
    count: int


class AnalyzeResponse(BaseModel):
    """Response model for LLM analysis."""
    analysis: Dict[str, Any]


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    version: str
    embedding_model: str
