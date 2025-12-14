from functools import lru_cache
from sklearn.metrics.pairwise import cosine_similarity


class SoftScoringEngine:

    def __init__(self, embedding_model, llm_model, major_w=0.2, skills_w=0.2, research_w=0.1):
        self.model = embedding_model
        self.llm = llm_model

        self.major_w = major_w
        self.skills_w = skills_w
        self.research_w = research_w

    @lru_cache(None)
    def _embed_cached(self, text):
        return self.model.encode([text])[0]

    def _embed(self, text):
        if not isinstance(text, str):
            text = ""
        return self._embed_cached(text)

    def normalize_major(self, text):
        return " ".join(text.lower().replace(",", " ").split())


    # --- Cosine similarity ---
    def score_major(self, application_major, scholarship_major):
        v1 = self._embed(self.normalize_major(application_major))
        v2 = self._embed(self.normalize_major(scholarship_major))
        return float(cosine_similarity([v1], [v2])[0][0])

    def score_skills(self, application_skills, scholarship_requirements):
        v1 = self._embed(application_skills)
        v2 = self._embed(scholarship_requirements)
        return float(cosine_similarity([v1], [v2])[0][0])

    def score_research_interest(self, application_research_interest, scholarship_fields):
        v1 = self._embed(application_research_interest)
        v2 = self._embed(scholarship_fields)
        return float(cosine_similarity([v1], [v2])[0][0])

    


    

