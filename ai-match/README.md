# Scholarship Matching System

A FastAPI-based scholarship matching system that uses AI and semantic analysis to match students with scholarships based on their profiles, academic performance, and preferences.

## Features

- **Intelligent Matching**: Uses semantic similarity and weighted scoring to match students with scholarships
- **LLM Analysis**: Integrates Google Gemini for detailed scholarship recommendations
- **Multi-criteria Evaluation**: Considers hard requirements, academic fit, and semantic matching
- **RESTful API**: Clean FastAPI endpoints for easy integration
- **Dockerized**: Ready for containerized deployment

## Project Structure

```
Scholarships/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application and endpoints
│   ├── scholarship_matcher.py  # Core matching logic
│   └── scholarship_query.py    # Database query layer
├── tests/                      # Test directory (to be implemented)
├── .env                        # Environment variables (not in git)
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── .dockerignore              # Docker ignore rules
├── Dockerfile                 # Docker container configuration
├── docker-compose.yml         # Docker Compose configuration
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Prerequisites

- Python 3.10+
- PostgreSQL databases (scholarship and profile)
- Google Gemini API key
- Docker (optional, for containerized deployment)

## Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Scholarships
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

5. **Run the application**
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`

### Docker Deployment

1. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   The API will be available at `http://localhost:8000`

3. **Run in detached mode**
   ```bash
   docker-compose up -d
   ```

4. **View logs**
   ```bash
   docker-compose logs -f
   ```

5. **Stop the application**
   ```bash
   docker-compose down
   ```

## API Endpoints

### Health Check
- **GET** `/`
  - Returns API status

### Scholarship Matching

- **GET** `/match/profile/{profile_id}`
  - Match scholarships for a specific profile
  - Query params: `top_k` (default: 5)

- **GET** `/match/scholarship/{scholarship_id}/applications`
  - Match applications for a specific scholarship
  - Query params: `top_k` (default: 5)

- **GET** `/match/scholarship/{scholarship_id}/profiles`
  - Match profiles for a specific scholarship
  - Query params: `top_k` (default: 5)

### LLM Analysis

- **POST** `/analyze/llm`
  - Get detailed LLM-based analysis
  - Request body:
    ```json
    {
      "application_id": 123,
      "scholarship_id": 456
    }
    ```

### API Documentation

Once the application is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host | `160.30.113.224` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME_SCHOLARSHIP` | Scholarship database name | `scholarship` |
| `DB_USER_SCHOLARSHIP` | Scholarship database user | `admin` |
| `DB_PASSWORD_SCHOLARSHIP` | Scholarship database password | `your_password` |
| `DB_NAME_PROFILE` | Profile database name | `profile` |
| `DB_USER_PROFILE` | Profile database user | `admin` |
| `DB_PASSWORD_PROFILE` | Profile database password | `your_password` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |

## Matching Algorithm

The system uses a three-tier matching approach:

1. **Hard Requirements (30% weight)**
   - Age range
   - Nationality restrictions
   - Study level
   - Gender requirements
   - Language proficiency (IELTS/TOEFL)

2. **Academic Fit (20% weight)**
   - GPA requirements
   - Test scores (SAT/ACT/GRE/GMAT)
   - Publications
   - Work experience
   - Class rank

3. **Semantic Matching (50% weight)**
   - Research interest alignment
   - Major compatibility
   - Skills relevance
   - Using BAAI/bge-large-en-v1.5 embeddings

## Technologies Used

- **FastAPI**: Modern web framework for building APIs
- **PostgreSQL**: Relational database for data storage
- **Sentence Transformers**: Semantic similarity using BAAI/bge-large-en-v1.5
- **Google Gemini**: LLM for detailed analysis and recommendations
- **Docker**: Containerization for easy deployment
- **Python-dotenv**: Environment variable management

## Development

### Adding New Features

1. Update the matching logic in `app/scholarship_matcher.py`
2. Add new endpoints in `app/main.py`
3. Update database queries in `app/scholarship_query.py`

### Running Tests

```bash
pytest tests/
```

## Troubleshooting

### Database Connection Issues
- Verify database credentials in `.env`
- Ensure PostgreSQL is running and accessible
- Check firewall rules for database port

### API Key Issues
- Verify `GEMINI_API_KEY` is set correctly
- Check API quota and rate limits

### Import Errors
- Ensure you're running from the project root
- Verify virtual environment is activated
- Check all dependencies are installed

## License

[Your License Here]

## Contributors

[Your Name/Team]

## Support

For issues and questions, please open an issue on the repository.
