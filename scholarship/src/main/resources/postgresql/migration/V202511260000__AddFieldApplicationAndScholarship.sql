ALTER TABLE scholarship.application
    -- Thông tin học vấn và mục tiêu nghề nghiệp
    ADD COLUMN major VARCHAR(255),
    ADD COLUMN education_level VARCHAR(100),
    ADD COLUMN school_name VARCHAR(255),
    ADD COLUMN career_goal TEXT,
    ADD COLUMN research_interest TEXT,

    -- Thông tin kỹ năng, giải thưởng, ngoại ngữ
    ADD COLUMN skills TEXT,
    ADD COLUMN academic_awards TEXT,
    ADD COLUMN publication_count INT,

    -- Điểm thi chuẩn hóa
    ADD COLUMN sat_score INT,
    ADD COLUMN act_score INT,
    ADD COLUMN gre_score INT,
    ADD COLUMN gmat_score INT,
    ADD COLUMN toefl_score INT,
    ADD COLUMN ielts_score DOUBLE PRECISION,

    -- Thông tin hoạt động ngoại khóa, cộng đồng, lãnh đạo
    ADD COLUMN extracurricular TEXT,
    ADD COLUMN work_experience_years INT,

    -- Thông tin về lớp (Class rank)
    ADD COLUMN class_rank INT,
    ADD COLUMN class_size INT,
    ADD COLUMN class_rank_percentile DECIMAL(5,2),

    -- Thông tin demographic & background
    ADD COLUMN age INT,
    ADD COLUMN citizenship VARCHAR(100),
    ADD COLUMN family_income_range VARCHAR(50),
    ADD COLUMN number_of_dependents INT,

    -- Thông tin đặc biệt (veteran, athlete, thành tích thể thao)
    ADD COLUMN is_athlete BOOLEAN DEFAULT FALSE,
    ADD COLUMN athletic_achievements TEXT;

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
