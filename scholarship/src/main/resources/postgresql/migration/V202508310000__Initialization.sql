CREATE SCHEMA IF NOT EXISTS scholarship;

CREATE TABLE IF NOT EXISTS scholarship.application (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    full_name VARCHAR(255),
    gender VARCHAR(50),
    date_of_birth VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(50),
    address VARCHAR(255),
    nationality VARCHAR(100),
    education_level VARCHAR(100),
    school_name VARCHAR(255),
    major VARCHAR(255),
    gpa DOUBLE PRECISION,
    graduation_year VARCHAR(50),
    skills TEXT,
    achievements TEXT,
    extracurricular TEXT,
    motivation TEXT,
    personal_statement TEXT,
    status VARCHAR(50),
    submitted_at VARCHAR(50),
    reviewed_at VARCHAR(50),
    reviewer_id VARCHAR(255),
    note TEXT,
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE                          BOOLEAN DEFAULT TRUE,
    VERSION                         NUMERIC DEFAULT 0,
    CREATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scholarship.application_preference (
    id BIGSERIAL PRIMARY KEY,
    application_id BIGINT,
    type VARCHAR(100),
    value VARCHAR(255),
    weight DOUBLE PRECISION,
    note TEXT,
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE                          BOOLEAN DEFAULT TRUE,
    VERSION                         NUMERIC DEFAULT 0,
    CREATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scholarship.application_review (
    id BIGSERIAL PRIMARY KEY,
    application_id BIGINT,
    review_id VARCHAR(255),
    score VARCHAR(50),
    comment TEXT,
    reviewed_at VARCHAR(50),
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE                          BOOLEAN DEFAULT TRUE,
    VERSION                         NUMERIC DEFAULT 0,
    CREATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scholarship.scholarship (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255),
    short_description TEXT,
    description TEXT,
    requirements TEXT,
    benefits TEXT,
    fields TEXT,
    country VARCHAR(100),
    university VARCHAR(255),
    study_level VARCHAR(100),
    scholarship_type VARCHAR(100),
    funding_amount VARCHAR(100),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    available_slots INT,
    language_requirement VARCHAR(100),
    gpa_requirement DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS scholarship.SCHOLARSHIP_MEDIA (
    SCHOLARSHIP_ID BIGINT,
    MEDIA_ID BIGINT
);

CREATE TABLE IF NOT EXISTS scholarship.APPLICATION_MEDIA (
    APPLICATION BIGINT,
    MEDIA_ID BIGINT
);