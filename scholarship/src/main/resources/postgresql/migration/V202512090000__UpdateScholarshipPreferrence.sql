ALTER TABLE scholarship.scholarship_preference
DROP
COLUMN IF EXISTS type,
    DROP
COLUMN IF EXISTS value,
    ADD COLUMN IF NOT EXISTS field VARCHAR(255);