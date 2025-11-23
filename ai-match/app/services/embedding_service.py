"""Embedding and similarity search service."""
import re
from typing import Dict, Any, List
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.config import get_settings
from app.services.database_service import all_scholarships_query, all_applicant_profile_query, application_query

settings = get_settings()

# Initialize embedding model (singleton)
_embedding_model = None


def get_embedding_model() -> SentenceTransformer:
    """Get or initialize the embedding model."""
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = SentenceTransformer(settings.embedding_model_name)
    return _embedding_model


def normalize(text: str) -> str:
    """Normalize text for embedding."""
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def get_embedding(text: str) -> Any:
    """Get embedding vector for text."""
    text = text.replace("\n", " ")
    model = get_embedding_model()
    response = model.encode(text)
    return response


def create_scholarship_text(scholarship: Dict[str, Any]) -> str:
    """Create text representation of scholarship."""
    # Preferences
    prefs = ", ".join(
        p.get("note", "") for p in scholarship.get("scholarship_preferences", [])
    ) or "None"
    
    # Main information
    title = scholarship.get("title", "N/A")
    description = scholarship.get("description", "N/A")
    country = scholarship.get("country", "N/A")
    fields = ", ".join(scholarship.get("fields", [])) if isinstance(scholarship.get("fields"), list) else scholarship.get("fields", "N/A")
    level = scholarship.get("study_level", "N/A")
    gpa_req = scholarship.get("gpa_requirement", "N/A")
    lang_req = scholarship.get("language_requirement", "N/A")
    
    text = (
        f"Scholarship Title: {title}\n"
        f"Description: {description}\n"
        f"Country: {country}\n"
        f"Fields: {fields}\n"
        f"Level: {level}\n"
        f"Requirements:\n"
        f"  - GPA: {gpa_req}\n"
        f"  - Language: {lang_req}\n"
        f"Preferences: {prefs}"
    )
    
    return text


def create_application_text(application: Dict[str, Any]) -> str:
    """Create text representation of application."""
    # Normalize empty values
    lang = application.get("languages") or "None"
    skills = application.get("skills") or "None"
    achievements = application.get("achievements") or "None"
    background = application.get("personal_statement") or "None"
    nationality = application.get("nationality") or "Unknown"
    
    prefs = ", ".join(pref.get("note", "") for pref in application.get("application_attributes", []))
    
    query = f"""
Student seeking {application.get('education_level', 'N/A')} scholarship in {application.get('major', 'N/A')}

Academic:
  - GPA: {application.get('gpa', 'N/A')}

Skills:
  {skills}

Language:
  {lang}

Achievements:
  {achievements}

Background:
  {background}

Nationality:
  {nationality}

Preferences:
  {prefs}
    """
    
    return query.strip()


def create_applicant_text(applicant: Dict[str, Any]) -> str:
    """Create text representation of applicant."""
    # Preferences
    prefs = ", ".join(pref.get("note", "") for pref in applicant.get("applicant_preferences", []))
    
    # Education histories
    education_histories_text = "\n".join(
        f"  - Institution Type: {edu.get('institution_type', 'N/A')}\n"
        f"    Major Name: {edu.get('major_name', 'N/A')}\n"
        f"    GPA: {edu.get('gpa', 'N/A')}\n"
        for edu in applicant.get("applicant_education_history", [])
    )
    
    # Skills
    skills_list_text = "\n".join(
        f"  - Name: {skill.get('name', 'N/A')}\n"
        f"    Level: {skill.get('level', 'N/A')}\n"
        for skill in applicant.get('applicant_skills', [])
    )
    
    query = f"""
Hometown: {applicant.get('hometown', 'N/A')}
Career goals: {applicant.get('career_goals', 'N/A')}
Overall GPA: {applicant.get('overall_gpa', 'N/A')}

Education histories:
{education_histories_text}

Preferences: {prefs}

Skills:
{skills_list_text}
    """
    
    return query.strip()


def embedding_scholarships(scholarships: Dict[int, Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Create embeddings for all scholarships."""
    scholarship_embeddings = []
    scholarships_list = list(scholarships.values())
    for scholarship in scholarships_list:
        text = create_scholarship_text(scholarship)
        embedding = get_embedding(normalize(text))
        scholarship_embeddings.append({
            "id": scholarship["id"],
            "scholarship": scholarship,
            "embedding": embedding
        })
    return scholarship_embeddings


def embedding_applicants(applicants: Dict[int, Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Create embeddings for all applicants."""
    applicant_embeddings = []
    applicants_list = list(applicants.values())
    for applicant in applicants_list:
        text = create_applicant_text(applicant)
        embedding = get_embedding(normalize(text))
        applicant_embeddings.append({
            "id": applicant["id"],
            "applicant": applicant,
            "embedding": embedding
        })
    return applicant_embeddings


def embedding_applications(applications: Dict[int, Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Create embeddings for all applications."""
    application_embeddings = []
    applications_list = list(applications.values())
    for application in applications_list:
        text = create_application_text(application)
        embedding = get_embedding(normalize(text))
        application_embeddings.append({
            "id": application["id"],
            "application": application,
            "embedding": embedding
        })
    return application_embeddings


def scholarships_search(applicant_id: int, sch_cursor, prof_cursor, top_k: int = 5) -> List[Dict[str, Any]]:
    """Search for scholarships matching an applicant."""
    # Get data
    all_scholarships = all_scholarships_query(sch_cursor)
    all_applicants = all_applicant_profile_query(prof_cursor)
    
    # Get applicant
    applicant = all_applicants.get(applicant_id)
    if not applicant:
        raise ValueError(f"Applicant with ID {applicant_id} not found")
    
    # Create embeddings
    scholarships_emb = embedding_scholarships(all_scholarships)
    
    # Create query embedding
    query = create_applicant_text(applicant)
    query_embedding = get_embedding(query)
    
    # Calculate similarity
    scores = []
    for item in scholarships_emb:
        similarity = cosine_similarity(
            [query_embedding],
            [item["embedding"]]
        )[0][0]
        scores.append({
            "scholarship": item["scholarship"]["id"],
            "similarity_score": float(similarity)
        })
    
    # Sort and return top K
    scores.sort(key=lambda x: x["similarity_score"], reverse=True)
    return scores[:top_k]


def applicant_search(scholarship_id: int, sch_cursor, prof_cursor, top_k: int = 5) -> List[Dict[str, Any]]:
    """Search for applicants matching a scholarship."""
    # Get data
    all_scholarships = all_scholarships_query(sch_cursor)
    all_applicants = all_applicant_profile_query(prof_cursor)
    
    # Get scholarship
    scholarship = all_scholarships.get(scholarship_id)
    if not scholarship:
        raise ValueError(f"Scholarship with ID {scholarship_id} not found")
    
    # Create embeddings
    applicants_emb = embedding_applicants(all_applicants)
    
    # Create query embedding
    query = create_scholarship_text(scholarship)
    query_embedding = get_embedding(query)
    
    # Calculate similarity
    scores = []
    for item in applicants_emb:
        similarity = cosine_similarity(
            [query_embedding],
            [item["embedding"]]
        )[0][0]
        scores.append({
            "applicant": item["applicant"]["id"],
            "similarity_score": float(similarity)
        })
    
    # Sort and return top K
    scores.sort(key=lambda x: x["similarity_score"], reverse=True)
    return scores[:top_k]


def application_search(scholarship_id: int, sch_cursor, top_k: int = 5) -> List[Dict[str, Any]]:
    """Search and rank applications for a scholarship."""
    # Get data
    all_scholarships = all_scholarships_query(sch_cursor)
    applications_list = application_query(sch_cursor, scholarship_id)
    
    # Get scholarship
    scholarship = all_scholarships.get(scholarship_id)
    if not scholarship:
        raise ValueError(f"Scholarship with ID {scholarship_id} not found")
    
    # Create embeddings
    applications_emb = embedding_applications(applications_list)
    
    # Create query embedding
    query = create_scholarship_text(scholarship)
    query_embedding = get_embedding(query)
    
    # Calculate similarity
    scores = []
    for item in applications_emb:
        similarity = cosine_similarity(
            [query_embedding],
            [item["embedding"]]
        )[0][0]
        scores.append({
            "application": item["application"]["id"],
            "similarity_score": float(similarity)
        })
    
    # Sort and return top K
    scores.sort(key=lambda x: x["similarity_score"], reverse=True)
    return scores[:top_k]
