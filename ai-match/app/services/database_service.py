"""Database query service for scholarships and applicants."""
from typing import Dict, Any


def all_scholarships_query(cursor) -> Dict[int, Dict[str, Any]]:
    """Fetch all scholarships with preferences."""
    query = """
        SELECT
            s.id,
            s.title,
            s.description,
            s.requirements,
            s.fields,
            s.country,
            s.study_level,
            s.language_requirement,
            s.gpa_requirement,

            COALESCE(
                json_agg(
                    json_build_object(
                        'type', sp.type,
                        'value', sp.value,
                        'note', sp.note
                    )
                ) FILTER (WHERE sp.type IS NOT NULL),
                '[]'
            ) AS scholarship_preferences

        FROM scholarship.scholarship s
        LEFT JOIN scholarship.scholarship_preference sp
            ON s.id = sp.scholarship_id
        GROUP BY s.id
    """
    
    cursor.execute(query)
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    
    result = {}
    for row in rows:
        item = dict(zip(col_names, row))
        result[item["id"]] = item
    
    return result


def application_query(cursor, scholarship_id: int) -> Dict[int, Dict[str, Any]]:
    """Fetch applications for a specific scholarship."""
    query = f"""
        SELECT
            a.id,
            a.nationality,
            a.education_level,
            a.major,
            a.gpa,
            a.graduation_year,
            a.skills,
            a.languages,
            a.achievements,
            a.extracurricular,
            a.motivation,
            a.personal_statement,

            COALESCE(
                json_agg(
                    json_build_object(
                        'key', at.key,
                        'value', at.value,
                        'note', at.note
                    )
                ) FILTER (WHERE at.key IS NOT NULL),
                '[]'
            ) AS application_attributes

        FROM scholarship.application a
        LEFT JOIN scholarship.application_attribute at
            ON a.id = at.application_id
        JOIN scholarship.application_scholarship asch
            ON a.id = asch.application_id
        WHERE asch.scholarship_id = {scholarship_id}
        GROUP BY a.id
    """
    
    cursor.execute(query)
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    
    result = {}
    for row in rows:
        item = dict(zip(col_names, row))
        result[item["id"]] = item
    
    return result


def all_applicant_profile_query(cursor) -> Dict[int, Dict[str, Any]]:
    """Fetch all applicant profiles with preferences and related data."""
    query = """
        SELECT
          ap.id,
          ap.hometown,
          ap.career_goals,
          ap.overall_gpa,
          COALESCE(
                  json_agg(
                      json_build_object(
                          'type', apf.type,
                          'value', apf.value,
                          'note', apf.note
                      )
                  ) FILTER (WHERE apf.type IS NOT NULL),
                  '[]'
              ) AS applicant_preferences,
              COALESCE(
                  json_agg(
                      json_build_object(
                          'name', ac.certificate_name,
                          'score', ac.score
                      )
                  ) FILTER (WHERE apf.type IS NOT NULL),
                  '[]'
              ) AS applicant_certificates,
              COALESCE(
                  json_agg(
                      json_build_object(
                          'name', ask.skill_name,
                          'level', ask.proficiency_level,
                          'years_experience', ask.years_experience
                      )
                  ) FILTER (WHERE apf.type IS NOT NULL),
                  '[]'
              ) AS applicant_skills,
              COALESCE(
                  json_agg(
                      json_build_object(
                          'institution_type', aeh.institution_type,
                          'major_name', aeh.major_name,
                          'gpa', aeh.gpa
                      )
                  ) FILTER (WHERE apf.type IS NOT NULL),
                  '[]'
              ) AS applicant_education_history
        FROM profile.applicant_profile ap
        LEFT JOIN profile.applicant_preference apf
            ON ap.id = apf.applicant_id
        LEFT JOIN profile.applicant_certificate ac
            ON ap.id = ac.applicant_id
        LEFT JOIN profile.applicant_skill ask
            ON ap.id = ask.applicant_id
        LEFT JOIN profile.applicant_education_history aeh
            ON ap.id = aeh.applicant_id
        GROUP BY ap.id
    """
    
    cursor.execute(query)
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    
    result = {}
    for row in rows:
        item = dict(zip(col_names, row))
        result[item["id"]] = item
    
    return result
