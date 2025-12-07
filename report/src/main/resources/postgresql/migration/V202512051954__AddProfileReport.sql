CREATE TABLE IF NOT EXISTS report.profile_reports (
    id BIGSERIAL PRIMARY KEY,
    report_id BIGINT,
    provider_id BIGINT
);