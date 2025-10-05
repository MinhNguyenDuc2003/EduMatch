CREATE SCHEMA IF NOT EXISTS media;

CREATE TABLE IF NOT EXISTS media.MEDIA (
ID                              BIGSERIAL           PRIMARY KEY,
S3_KEY                          VARCHAR(500)        NULL,
CONTENT_TYPE                    VARCHAR(100)        NULL,
SIZE                            BIGINT              NULL,
FOLDER_NAME                     VARCHAR(200)        NULL,
FILE_NAME                       VARCHAR(200)        NULL,
IS_PUBLIC                       BOOLEAN             NULL,
CREATED_BY                      VARCHAR(32) DEFAULT '',
UPDATED_BY                      VARCHAR(32) DEFAULT '',
ACTIVE                          BOOLEAN DEFAULT TRUE,
VERSION                         NUMERIC DEFAULT 0,
CREATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UPDATED_DATETIME                TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
