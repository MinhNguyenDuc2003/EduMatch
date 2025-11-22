# AI Match API

AI-powered scholarship matching system using embeddings and LLM analysis. This FastAPI application helps match applicants with suitable scholarships and provides intelligent analysis of scholarship-applicant compatibility.

## Features

- **Scholarship Search**: Find scholarships matching an applicant's profile
- **Applicant Search**: Find applicants suitable for a scholarship
- **Application Ranking**: Rank applications for a specific scholarship
- **LLM Analysis**: Get detailed AI-powered analysis of applicant-scholarship matches
- **RESTful API**: Clean, well-documented API endpoints
- **Docker Support**: Easy deployment with Docker and Docker Compose

## Technology Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Sentence Transformers**: For generating embeddings
- **Google GenAI**: For LLM-powered analysis
- **PostgreSQL**: Database for scholarships and applicant profiles
- **Docker**: Containerization for easy deployment

## Installation

### Local Development

1. **Clone the repository** (if applicable)

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Update the values with your actual credentials:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and fill in your database credentials and API keys

5. **Run the application**:
   ```bash
   uvicorn app.main:app --reload
   ```

6. **Access the API documentation**:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Docker Deployment

1. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

2. **Build and run with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Or build and run manually**:
   ```bash
   docker build -t ai-match:latest .
   docker run -p 8000:8000 --env-file .env ai-match:latest
   ```

4. **Check container health**:
   ```bash
   docker ps
   docker logs ai-match-api
   ```

## API Endpoints

### Health Check
- `GET /health` - Check API health status
- `GET /` - API information

### Scholarship Matching
- `POST /api/v1/scholarships/search` - Search scholarships for an applicant
  ```json
  {
    "applicant_id": 1,
    "top_k": 5
  }
  ```

### Applicant Matching
- `POST /api/v1/applicants/search` - Search applicants for a scholarship
  ```json
  {
    "scholarship_id": 65,
    "top_k": 5
  }
  ```

### Application Ranking
- `POST /api/v1/applications/rank` - Rank applications for a scholarship
  ```json
  {
    "scholarship_id": 65,
    "top_k": 5
  }
  ```

### LLM Analysis
- `POST /api/v1/analyze` - Get detailed match analysis
  ```json
  {
    "applicant_id": 3,
    "scholarship_id": 65
  }
  ```

## Configuration

All configuration is managed through environment variables. See `.env.example` for all available options.

### Required Environment Variables

- `SCHOLARSHIP_DB_HOST`, `SCHOLARSHIP_DB_NAME`, `SCHOLARSHIP_DB_USER`, `SCHOLARSHIP_DB_PASSWORD`
- `PROFILE_DB_HOST`, `PROFILE_DB_NAME`, `PROFILE_DB_USER`, `PROFILE_DB_PASSWORD`
- `GOOGLE_GENAI_API_KEY`

## Project Structure

```
ai-match/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connections
│   ├── models.py            # Pydantic models
│   └── services/
│       ├── __init__.py
│       ├── database_service.py    # Database queries
│       ├── embedding_service.py   # Embedding & similarity
│       └── llm_service.py         # LLM analysis
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
├── .env.example           # Environment template
└── README.md              # This file
```

## Development

### Running Tests
```bash
# Add your test commands here
pytest
```

### Code Quality
```bash
# Format code
black app/

# Lint code
flake8 app/

# Type checking
mypy app/
```

## Production Deployment

For production deployment:

1. Set `DEBUG=false` in `.env`
2. Use a proper ASGI server configuration
3. Set up proper CORS origins in `app/main.py`
4. Use environment-specific secrets management
5. Set up monitoring and logging
6. Configure proper database connection pooling

## License

[Add your license here]

## Contact

[Add contact information here]
