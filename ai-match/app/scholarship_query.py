import json
import re
import os
from dotenv import load_dotenv

load_dotenv()

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity



from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline


import psycopg2
from psycopg2 import Error

from decimal import Decimal
from datetime import datetime

import numpy as np

class ScholarshipQuery:
    def __init__(self):
        """
        cursor: psycopg2 cursor đã mở sẵn
        """

        self.DB_SCHOLARSHIP = {
                'host': os.getenv('DB_HOST'),
                'port': os.getenv('DB_PORT'),
                'database': os.getenv('DB_NAME_SCHOLARSHIP'),
                'user': os.getenv('DB_USER_SCHOLARSHIP'),
                'password': os.getenv('DB_PASSWORD_SCHOLARSHIP')
              }

        self.DB_PROFILE = {
                'host': os.getenv('DB_HOST'),
                'port': os.getenv('DB_PORT'),
                'database': os.getenv('DB_NAME_PROFILE'),
                'user': os.getenv('DB_USER_PROFILE'),
                'password': os.getenv('DB_PASSWORD_PROFILE')
              }

        self.sch_conn, self.sch_cur, self.prof_conn, self.prof_cur = self.connect_database()

    def connect_database(self):
        """Kết nối đến PostgreSQL database"""
        try:
            # Tạo kết nối
            scholarship_connection = psycopg2.connect(
                host =      self.DB_SCHOLARSHIP['host'],
                port =      self.DB_SCHOLARSHIP['port'],
                database =  self.DB_SCHOLARSHIP['database'],
                user =      self.DB_SCHOLARSHIP['user'],
                password =  self.DB_SCHOLARSHIP['password']
            )

            profile_connection = psycopg2.connect(
                host =      self.DB_PROFILE['host'],
                port =      self.DB_PROFILE['port'],
                database =  self.DB_PROFILE['database'],
                user =      self.DB_PROFILE['user'],
                password =  self.DB_PROFILE['password']
            )

            scholarship_connection.autocommit = True
            profile_connection.autocommit = True

            # Tạo cursor
            scholarship_cursor = scholarship_connection.cursor()
            profile_cursor = profile_connection.cursor()

            return scholarship_connection, scholarship_cursor, profile_connection, profile_cursor

        except Error as e:
            print(f"Lỗi kết nối database: {e}")
            return None, None

    # ------------------------------------------------------
    # Convert tuple → dictionary (clean: decimal, datetime)
    # ------------------------------------------------------
    def _rows_to_dict_list(self, cursor, rows):
        colnames = [desc[0] for desc in cursor.description]
        dict_list = []

        for row in rows:
            item = {}
            for idx, col in enumerate(colnames):
                val = row[idx]

                # Decimal → float
                if isinstance(val, Decimal):
                    val = float(val)

                # datetime → ISO string
                if isinstance(val, datetime):
                    val = val.isoformat()

                item[col] = val

            dict_list.append(item)

        return dict_list

    # ------------------------------------------------------
    # Query 1 học bổng theo ID
    # ------------------------------------------------------
    """def get_scholarship(self, scholarship_id):
        query =
            SELECT * FROM scholarship.scholarship
            WHERE id = %s

        self.sch_cur.execute(query, (scholarship_id,))
        rows = self.sch_cur.fetchall()

        if not rows:
            return None

        sch = self._rows_to_dict_list(self.sch_cur, rows)[0]
        return sch"""

    # ------------------------------------------------------
    # Query nhiều học bổng theo list ID
    # ------------------------------------------------------
    def get_scholarships(self, id_list):
        results = []

        for sid in id_list:
            sch = self.get_scholarship(all = False, scholarship_id=sid)
            if sch:
                results.append(sch)

        return results

    # ------------------------------------------------------
    # Query tất cả học bổng
    # ------------------------------------------------------
    def get_scholarship(self, all=True, scholarship_id=None, limit=None):
        query = """
            SELECT
                s.id,
                s.title,
                s.description,
                s.requirements,
                s.fields,
                s.required_major,
                s.benefits,
                s.scholarship_type,
                s.country,
                s.university,
                s.study_level,
                s.language_requirement,
                s.gpa_requirement,
                s.min_age,
                s.max_age,
                s.gender_requirement,
                s.required_sat_score,
                s.required_act_score,
                s.required_gre_score,
                s.required_gmat_score,
                s.required_toefl_score,
                s.required_ielts_score,
                s.required_work_experience_years,
                s.required_publication_count,
                s.required_academic_awards,
                s.required_class_rank_percentile,
                s.restricted_nationalities,

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
        """

        if all == True:
            query += f" GROUP BY s.id "

        if scholarship_id:
            query += f" WHERE s.id = {scholarship_id} GROUP BY s.id"

        if limit:
            query += f" GROUP BY s.id LIMIT {limit}"

        self.sch_cur.execute(query)
        rows = self.sch_cur.fetchall()

        if not rows:
            return None

        return self._rows_to_dict_list(self.sch_cur, rows)

    def get_application_of_scholarship(self, scholarship_id):
        """Trả dữ liệu scholarship + preference dạng JSON"""

        query = """
            SELECT
                a.id,
                a.age,
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
                a.career_goal,
                a.research_interest,
                a.academic_awards,
                a.publication_count,
                a.sat_score,
                a.act_score,
                a.gre_score,
                a.gmat_score,
                a.toefl_score,
                a.ielts_score,
                a.work_experience_years,
                a.class_rank,
                a.class_rank_percentile,
                a.is_athlete,
                a.athletic_achievements,
                a.citizenship,

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
            WHERE asch.scholarship_id = %s
            GROUP BY a.id

        """

        self.sch_cur.execute(query, (scholarship_id,))
        rows = self.sch_cur.fetchall()

        result = self._rows_to_dict_list(self.sch_cur, rows)

        return result

    def get_profile(self, all=True, profile_id=None, limit=None):
        """Trả dữ liệu profile + preference dạng JSON"""
        query = f"""
            SELECT
              ap.id,
              ap.citizenship_status,
              ap.research_experience,
              ap.career_goals,
              ap.overall_gpa,
              ap.education_level,
              ap.sat_score,
              ap.act_score,
              ap.toefl_score,
              ap.ielts_score,
              ap.gre_score,
              ap.gmat_score,
              ap.publication_count,
              ap.research_interest,
              ap.preferred_scholarship_type,
              ap.preferred_university,
              ap.preferred_country,
              ap.extracurricular_activities,
              ap.academic_awards,

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
        """

        if all == True:
            query += f" GROUP BY ap.id"

        if profile_id:
            query += f" WHERE ap.id = {profile_id} GROUP BY ap.id"

        if limit:
            query += f" GROUP BY ap.id LIMIT {limit}"

        self.prof_cur.execute(query)
        rows = self.prof_cur.fetchall()

        result = self._rows_to_dict_list(self.prof_cur, rows)

        return result

    def get_application(self, application_id):
        """Query 1 application theo ID"""
        query = """
            SELECT
                a.id,
                a.age,
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
                a.career_goal,
                a.research_interest,
                a.academic_awards,
                a.publication_count,
                a.sat_score,
                a.act_score,
                a.gre_score,
                a.gmat_score,
                a.toefl_score,
                a.ielts_score,
                a.work_experience_years,
                a.class_rank,
                a.class_rank_percentile,
                a.is_athlete,
                a.athletic_achievements,
                a.citizenship,

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
            WHERE a.id = %s
            GROUP BY a.id
        """

        self.sch_cur.execute(query, (application_id,))
        rows = self.sch_cur.fetchall()

        if not rows:
            return None

        return self._rows_to_dict_list(self.sch_cur, rows)[0]