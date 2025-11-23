CREATE TABLE IF NOT EXISTS media.mail_template (
    ID                              BIGSERIAL           PRIMARY KEY,
    TYPE                            VARCHAR(100)        NULL,
    SUBJECT                         VARCHAR(500)        NULL,
    BODY                            TEXT                NULL,
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    VERSION NUMERIC NOT NULL DEFAULT 0,
    CREATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media.mail (
    ID                              BIGSERIAL           PRIMARY KEY,
    TEMPLATE_ID                     BIGINT              NULL,
    FROM_MAIL                       VARCHAR(500)        NULL,
    TO_MAIL                         VARCHAR(500)        NULL,
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    VERSION NUMERIC NOT NULL DEFAULT 0,
    CREATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
