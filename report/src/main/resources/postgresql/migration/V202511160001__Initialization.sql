CREATE SCHEMA IF NOT EXISTS report;

CREATE TABLE IF NOT EXISTS report.report_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(512) NULL,
    type VARCHAR(100) NULL,
    description TEXT NULL,
    created_by VARCHAR(32) DEFAULT '',
    updated_by VARCHAR(32) DEFAULT '',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version NUMERIC NOT NULL DEFAULT 0,
    created_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS report.reports (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    title VARCHAR(512) NULL,
    category_id BIGINT NULL,
    comment TEXT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    response TEXT NULL,
    created_by VARCHAR(32) DEFAULT '',
    updated_by VARCHAR(32) DEFAULT '',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version NUMERIC NOT NULL DEFAULT 0,
    created_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS report.scholarship_reports (
    id BIGSERIAL PRIMARY KEY,
    report_id BIGINT,
    scholarship_id BIGINT
);

CREATE TABLE IF NOT EXISTS report.application_reports (
    id BIGSERIAL PRIMARY KEY,
    report_id BIGINT,
    application_id BIGINT
);

CREATE TABLE IF NOT EXISTS report.provider_reports (
    id BIGSERIAL PRIMARY KEY,
    report_id BIGINT,
    provider_id BIGINT
);
