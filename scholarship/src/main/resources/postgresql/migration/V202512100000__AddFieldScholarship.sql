ALTER TABLE scholarship.scholarship
    -- Yêu cầu học vấn, ngành
    ADD COLUMN required_major TEXT,

    ADD COLUMN restricted_nationalities TEXT,  -- List of NOT allowed countries
    ADD COLUMN min_age INT,
    ADD COLUMN max_age INT,
    ADD COLUMN gender_requirement VARCHAR(50),

    -- Điểm thi chuẩn hóa
    ADD COLUMN required_sat_score INT,
    ADD COLUMN required_act_score INT,
    ADD COLUMN required_gre_score INT,
    ADD COLUMN required_gmat_score INT,
    ADD COLUMN required_toefl_score INT,
    ADD COLUMN required_ielts_score DOUBLE PRECISION,

    -- Yêu cầu số năm kinh nghiệm
    ADD COLUMN required_work_experience_years INT,

    -- Yêu cầu thành tích nghiên cứu, học thuật, hoạt động ngoại khóa
    ADD COLUMN required_publication_count INT,
    ADD COLUMN required_academic_awards TEXT,

    -- Yêu cầu về lớp
    ADD COLUMN required_class_rank_percentile INT;