CREATE SCHEMA IF NOT EXISTS notification;

CREATE TABLE IF NOT EXISTS notification.USER_NOTIFICATION (
    id BIGSERIAL PRIMARY KEY,
    NOTIFICATION_ID BIGINT,
    USER_ID VARCHAR(100),
    IS_READ BOOLEAN NOT NULL DEFAULT FALSE,
    REFERENCE_TYPE VARCHAR(100),
    REFERENCE_ID BIGINT,
    content TEXT,
    slug VARCHAR(100),
    IS_ADMIN BOOLEAN NULL,
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    VERSION NUMERIC NOT NULL DEFAULT 0,
    CREATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notification.NOTIFICATION_TEMPLATE (
    id BIGSERIAL PRIMARY KEY,
    TITLE VARCHAR(512),
    CONTENT TEXT,
    TYPE VARCHAR(100),
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    VERSION NUMERIC NOT NULL DEFAULT 0,
    CREATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('New Scholarship from {{providerName}}',
        '{{providerName}} has just published a new scholarship titled "{{scholarshipName}}". Check it out and apply now!',
        'SCHOLARSHIP_NEW');

INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('Scholarship "{{scholarshipName}}" has been updated',
        '{{providerName}} has updated the details of "{{scholarshipName}}". View details for the latest information.',
        'SCHOLARSHIP_UPDATED');

INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('News from "{{providerName}}"',
        '{{providerName}} has published a new announcement.',
        'SCHOLARSHIP_NEWS');

INSERT INTO notification.NOTIFICATION_TEMPLATE
(TITLE, CONTENT, TYPE)
VALUES ('Application status updated',
        'Your application from scholarship "{scholarshipName}" status has been updated.',
        'APPLICATION_STATUS_UPDATED');

INSERT INTO notification.NOTIFICATION_TEMPLATE
(TITLE, CONTENT, TYPE)
VALUES ('Scholarship "{scholarshipName}" has receive application',
        'Scholarship "{scholarshipName}" has receive application from {applicantName}.',
        'SCHOLARSHIP_APPLICATION');

INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('You''ve Been Referred for a Scholarship from {{providerName}}',
        '{{providerName}} has just referred a new scholarship titled "{{scholarshipName}}". Check it out and apply now!',
        'APPLICATION_REFERRAL');
