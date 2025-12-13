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
    status VARCHAR(50) DEFAULT 'PENDING',
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

CREATE TABLE IF NOT EXISTS report.profile_reports (
    id BIGSERIAL PRIMARY KEY,
    report_id BIGINT,
    provider_id BIGINT
);

INSERT INTO report.report_categories (name, type, description) VALUES
('Profile Verification Issues', 'PROFILE', 'Problems with profile verification process and document validation'),
('Profile Privacy Concerns', 'PROFILE', 'Privacy and data security concerns related to user profiles'),
('Profile Update Problems', 'PROFILE', 'Technical issues when updating profile information'),
('Academic Record Issues', 'PROFILE', 'Problems with academic information, GPA, transcripts'),

('Provider Payment Issues', 'PROVIDER', 'Complaints about scholarship payment delays or problems'),
('Provider Discrimination', 'PROVIDER', 'Reports of discrimination by scholarship providers'),
('Provider Misleading Information', 'PROVIDER', 'Complaints about false or misleading scholarship information'),
('Provider Response Time', 'PROVIDER', 'Issues with slow provider response or communication'),
('Provider Requirements Change', 'PROVIDER', 'Complaints about sudden changes in scholarship requirements'),

('Application Deadline Issues', 'SCHOLARSHIP', 'Problems with scholarship application deadlines'),
('Eligibility Confusion', 'SCHOLARSHIP', 'Confusion about scholarship eligibility requirements'),
('Selection Process Concerns', 'SCHOLARSHIP', 'Complaints about unfair selection processes'),
('Document Requirements', 'SCHOLARSHIP', 'Issues with required documents for scholarship applications'),
('Award Amount Discrepancy', 'SCHOLARSHIP', 'Complaints about scholarship amount differences'),
('Scholarship Information Accuracy', 'SCHOLARSHIP', 'Reports about inaccurate scholarship information'),

('AI Matching Accuracy', 'SYSTEM', 'Complaints about incorrect AI scholarship matching'),
('Search Function Problems', 'SYSTEM', 'Issues with scholarship search functionality'),
('Login and Authentication', 'SYSTEM', 'Problems with user login and authentication system'),
('Mobile App Issues', 'SYSTEM', 'Technical problems with mobile application'),
('Website Performance', 'SYSTEM', 'Complaints about slow website or system performance'),
('Data Synchronization', 'SYSTEM', 'Issues with data not syncing properly across devices'),
('Notification Problems', 'SYSTEM', 'Issues with email or push notifications'),
('UI/UX Improvements', 'SYSTEM', 'Suggestions for user interface and experience improvements'),
('Security Concerns', 'SYSTEM', 'Reports about potential security vulnerabilities'),
('Feature Requests', 'SYSTEM', 'Requests for new system features and functionality');
