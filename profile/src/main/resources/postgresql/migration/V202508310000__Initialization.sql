CREATE SCHEMA IF NOT EXISTS profile;

CREATE TABLE IF NOT EXISTS profile.APPLICANT_PROFILE (
ID                              BIGSERIAL           PRIMARY KEY,
USER_ID                         VARCHAR(100)              NOT NULL,
CONTACT_NAME                    VARCHAR(450)        NULL,
FIRST_NAME                      VARCHAR(100)        NULL,
LAST_NAME                       VARCHAR(100)        NULL,
RELIGION                        VARCHAR(100)        NULL,
HOMETOWN                        VARCHAR(150)        NULL,
CITIZENSHIP_STATUS              VARCHAR(100)        NULL,
ETHNICITY                       VARCHAR(100)        NULL,
RACE                            VARCHAR(100)        NULL,
MILITARY_FAMILY_HISTORY         BOOLEAN             DEFAULT FALSE,
DISABILITIES                    VARCHAR(255)        NULL,
MEDICAL_CONDITIONS              VARCHAR(255)        NULL,
FAVORITE_ACTIVITIES             TEXT                NULL,
SPORTS_PARTICIPATED             TEXT                NULL,
STUDENT_ACTIVITIES              TEXT                NULL,
ORGANIZATIONS_JOINED            TEXT                NULL,
RESEARCH_EXPERIENCE             TEXT                NULL,
CAREER_GOALS                    TEXT                NULL,
OVERALL_GPA                     DECIMAL(3,2)        NULL,
CREATED_BY                      VARCHAR(32) DEFAULT '',
UPDATED_BY                      VARCHAR(32) DEFAULT '',
ACTIVE                          BOOLEAN DEFAULT TRUE,
VERSION                         NUMERIC DEFAULT 0,
CREATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UPDATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.APPLICANT_SKILL (
                                         ID BIGSERIAL PRIMARY KEY,
                                         APPLICANT_ID BIGINT NOT NULL,
                                         SKILL_NAME VARCHAR(225),
                                         PROFICIENCY_LEVEL VARCHAR(100),
                                         YEARS_EXPERIENCE DECIMAL(4,2),
                                         CREATED_BY VARCHAR(32) DEFAULT '',
                                         UPDATED_BY VARCHAR(32) DEFAULT '',
                                         ACTIVE BOOLEAN DEFAULT TRUE,
                                         VERSION NUMERIC DEFAULT 0,
                                         CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                         UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.APPLICANT_EDUCATION_HISTORY (
                                                     ID BIGSERIAL PRIMARY KEY,
                                                     APPLICANT_ID BIGINT NOT NULL,
                                                     INSTITUTION_NAME VARCHAR(200),
                                                     INSTITUTION_TYPE VARCHAR(50),
                                                     STATE VARCHAR(100),
                                                     COUNTRY VARCHAR(100),
                                                     DEGREE_TYPE VARCHAR(50),
                                                     MAJOR_CATEGORY VARCHAR(150),
                                                     MAJOR_NAME VARCHAR(150),
                                                     GPA DECIMAL(3,2),
                                                     CLASS_RANK VARCHAR(50),
                                                     CLASS_SIZE INT,
                                                     ENROLLMENT_START_DATE TIMESTAMP,
                                                     ENROLLMENT_END_DATE TIMESTAMP,
                                                     GRADUATION_YEAR INT,
                                                     IS_DUAL_ENROLLED BOOLEAN DEFAULT FALSE,
                                                     IS_TRANSFER BOOLEAN DEFAULT FALSE,
                                                     IS_RETURNING_STUDENT BOOLEAN DEFAULT FALSE,
                                                     NOTES TEXT,
                                                     CREATED_BY VARCHAR(32) DEFAULT '',
                                                     UPDATED_BY VARCHAR(32) DEFAULT '',
                                                     ACTIVE BOOLEAN DEFAULT TRUE,
                                                     VERSION NUMERIC DEFAULT 0,
                                                     CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                     UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.APPLICANT_CERTIFICATE (
                                               ID BIGSERIAL PRIMARY KEY,
                                               APPLICANT_ID BIGINT NOT NULL,
                                               CERTIFICATE_NAME VARCHAR(150) NOT NULL,
                                               ISSUED_BY VARCHAR(150),
                                               ISSUE_DATE TIMESTAMP,
                                               EXPIRY_DATE TIMESTAMP,
                                               SCORE VARCHAR(50),
                                               CREATED_BY VARCHAR(32) DEFAULT '',
                                               UPDATED_BY VARCHAR(32) DEFAULT '',
                                               ACTIVE BOOLEAN DEFAULT TRUE,
                                               VERSION NUMERIC DEFAULT 0,
                                               CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                               UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.APPLICANT_PHONE (
                                         ID BIGSERIAL PRIMARY KEY,
                                         APPLICANT_ID BIGINT NOT NULL,
                                         PHONE_TYPE VARCHAR(20) NOT NULL DEFAULT 'Mobile',
                                         COUNTRY_CODE VARCHAR(10),
                                         PHONE_NUMBER VARCHAR(30) NOT NULL,
                                         IS_INTERNATIONAL BOOLEAN NOT NULL DEFAULT FALSE,
                                         CREATED_BY VARCHAR(32) DEFAULT '',
                                         UPDATED_BY VARCHAR(32) DEFAULT '',
                                         ACTIVE BOOLEAN DEFAULT TRUE,
                                         VERSION NUMERIC DEFAULT 0,
                                         CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                         UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.APPLICANT_INTENTION (
                                             ID BIGSERIAL PRIMARY KEY,
                                             APPLICANT_ID BIGINT NOT NULL,
                                             INTENDED_INSTITUTION VARCHAR(200),
                                             INTENDED_STATE VARCHAR(100),
                                             INTENDED_COUNTRY VARCHAR(100),
                                             DEGREE_TYPE VARCHAR(50),
                                             INTENDED_MAJOR_CATEGORY VARCHAR(150),
                                             INTENDED_MAJOR_NAME VARCHAR(150),
                                             ACADEMIC_CLASSIFICATION VARCHAR(50),
                                             EXPECTED_START_DATE DATE,
                                             EXPECTED_GRADUATION_YEAR INT,
                                             IS_TRANSFER_STUDENT BOOLEAN NOT NULL DEFAULT FALSE,
                                             IS_RETURNING_STUDENT BOOLEAN NOT NULL DEFAULT FALSE,
                                             NOTES TEXT,
                                             CREATED_BY VARCHAR(32) DEFAULT '',
                                             UPDATED_BY VARCHAR(32) DEFAULT '',
                                             ACTIVE BOOLEAN DEFAULT TRUE,
                                             VERSION NUMERIC DEFAULT 0,
                                             CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                             UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.PROVIDER_PROFILE (
    ID BIGSERIAL PRIMARY KEY,
    USER_ID VARCHAR(100),
    ORGANIZATION_NAME VARCHAR(200) NULL,
    ORGANIZATION_TYPE VARCHAR(100) NULL,
    WEBSITE VARCHAR(255) NULL,
    EMAIL VARCHAR(255) NULL,
    PHONE VARCHAR(50) NULL,
    ADDRESS_SUMMARY VARCHAR(255) NULL,
    DESCRIPTION TEXT NULL,
    YEAR_ESTABLISHED INT NULL,
    ACCREDITATION VARCHAR(255) NULL,
    SPECIALIZATION VARCHAR(255) NULL,
    VERIFIED BOOLEAN NULL,
    CREATED_BY VARCHAR(32) DEFAULT '',
    UPDATED_BY VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN DEFAULT TRUE,
    VERSION NUMERIC DEFAULT 0,
    CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.PROVIDER_MEDIA (
    PROVIDER_ID BIGINT,
    MEIDA_ID BIGINT,
    IMAGE_TYPE VARCHAR(50) NULL,
);

    CREATE TABLE IF NOT EXISTS profile.PROVIDER_CONTACT (
    ID BIGSERIAL PRIMARY KEY,
    PROVIDER_ID BIGINT,

    CONTACT_NAME VARCHAR(150) NULL,
    ROLE_TITLE VARCHAR(100) NULL,
    EMAIL VARCHAR(255) NULL,
    PHONE VARCHAR(50) NULL,
    LINKEDIN_URL VARCHAR(255) NULL,

    CREATED_BY VARCHAR(32) DEFAULT '',
    UPDATED_BY VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN DEFAULT TRUE,
    VERSION NUMERIC DEFAULT 0,
    CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.PROVIDER_NEWS (
    ID BIGSERIAL PRIMARY KEY,
    PROVIDER_ID BIGINT,

    TITLE VARCHAR(255),
    CONTENT TEXT,
    PUBLISHED_AT TIMESTAMP,
    LINK VARCHAR(500),

    CREATED_BY VARCHAR(32) DEFAULT '',
    UPDATED_BY VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN DEFAULT TRUE,
    VERSION NUMERIC DEFAULT 0,
    CREATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile.PROVIDER_NEWS_MEDIA (
    PROVIDER_NEWS_ID BIGINT,
    MEIDA_ID BIGINT
);
