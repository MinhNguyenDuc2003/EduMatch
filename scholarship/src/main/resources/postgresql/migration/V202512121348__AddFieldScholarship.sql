ALTER TABLE scholarship.scholarship
    ADD COLUMN IF NOT EXISTS required_major TEXT,
    ADD COLUMN IF NOT EXISTS restricted_nationalities TEXT,
    ADD COLUMN IF NOT EXISTS min_age INT,
    ADD COLUMN IF NOT EXISTS max_age INT,
    ADD COLUMN IF NOT EXISTS gender_requirement VARCHAR(50),

    -- Điểm thi chuẩn hóa
    ADD COLUMN IF NOT EXISTS required_sat_score INT,
    ADD COLUMN IF NOT EXISTS required_act_score INT,
    ADD COLUMN IF NOT EXISTS required_gre_score INT,
    ADD COLUMN IF NOT EXISTS required_gmat_score INT,
    ADD COLUMN IF NOT EXISTS required_toefl_score INT,
    ADD COLUMN IF NOT EXISTS required_ielts_score DOUBLE PRECISION,

    -- Yêu cầu số năm kinh nghiệm
    ADD COLUMN IF NOT EXISTS required_work_experience_years INT,

    -- Thành tích nghiên cứu, học thuật
    ADD COLUMN IF NOT EXISTS required_publication_count INT,
    ADD COLUMN IF NOT EXISTS required_academic_awards TEXT,

    -- Yêu cầu về xếp hạng lớp
    ADD COLUMN IF NOT EXISTS required_class_rank_percentile INT,

    ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Public';