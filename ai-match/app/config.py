"""Configuration management using pydantic-settings."""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application settings
    app_name: str = "AI Match API"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Scholarship Database
    scholarship_db_host: str
    scholarship_db_port: str = "5432"
    scholarship_db_name: str
    scholarship_db_user: str
    scholarship_db_password: str
    
    # Profile Database
    profile_db_host: str
    profile_db_port: str = "5432"
    profile_db_name: str
    profile_db_user: str
    profile_db_password: str
    
    # Google GenAI
    google_genai_api_key: str
    
    # Embedding Model
    embedding_model_name: str = "all-MiniLM-L6-v2"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
