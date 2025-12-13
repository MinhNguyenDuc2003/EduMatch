CREATE SCHEMA IF NOT EXISTS subscription;

CREATE TABLE IF NOT EXISTS subscription.subscription_plan (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(512) NOT NULL,
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    duration_days INT NOT NULL,
    target_type VARCHAR(255),
    features TEXT,
    created_by VARCHAR(32) DEFAULT '',
    updated_by VARCHAR(32) DEFAULT '',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version NUMERIC NOT NULL DEFAULT 0,
    created_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscription.subscription (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    user_type VARCHAR(50) DEFAULT 'USER',
    plan_id BIGINT REFERENCES subscription.subscription_plan(id),
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_by VARCHAR(32) DEFAULT '',
    updated_by VARCHAR(32) DEFAULT '',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version NUMERIC NOT NULL DEFAULT 0,
    created_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscription.payment (
    id BIGSERIAL PRIMARY KEY,
    subscription_id BIGINT REFERENCES subscription.subscription(id),
    user_id VARCHAR(100),
    amount DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'USD',
    payment_method VARCHAR(100),
    transaction_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'PENDING',
    paid_at TIMESTAMP,
    created_by VARCHAR(32) DEFAULT '',
    updated_by VARCHAR(32) DEFAULT '',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version NUMERIC NOT NULL DEFAULT 0,
    created_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO subscription.subscription_plan
(name, description, price, currency, duration_days, target_type, features, created_by)
VALUES
(
 'AI Scholarship 30-Day Plan',
 'Receive AI-powered scholarship notifications and recommendations for 30 days.',
 9.99,
 'USD',
 30,
 'APPLICANT',
 '["AI_SCHOLARSHIP_NOTIFICATION","AI_SCHOLARSHIP_RECOMMENDATION"]',
 'system'
),
(
 'AI Recruitment 30-Day Plan',
 'Post scholarships and access AI candidate recommendations with application filtering for 30 days.',
 19.99,
 'USD',
 30,
 'PROVIDER',
 '["POST_SCHOLARSHIP","AI_PROFILE_RECOMMENDATION","APPLICATION_FILTERING"]',
 'system'
);
