-- Đổi USER_ID -> APPLICANT_ID (kiểu BIGINT)
ALTER TABLE profile.provider_favourite
    RENAME COLUMN user_id TO applicant_id_old;

ALTER TABLE profile.provider_favourite
    ALTER COLUMN applicant_id_old TYPE BIGINT USING applicant_id_old::BIGINT;

ALTER TABLE profile.provider_favourite
    RENAME COLUMN applicant_id_old TO applicant_id;

-- Đổi PROVIDER_ID -> USER_ID (kiểu VARCHAR)
ALTER TABLE profile.provider_favourite
    RENAME COLUMN provider_id TO provider_id_old;

ALTER TABLE profile.provider_favourite
    ALTER COLUMN provider_id_old TYPE VARCHAR(100);

ALTER TABLE profile.provider_favourite
    RENAME COLUMN provider_id_old TO user_id;


