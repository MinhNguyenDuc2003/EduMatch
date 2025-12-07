INSERT INTO subscription.subscription_plan
(name, description, price, currency, duration_days, target_type, features, created_by)
VALUES
-- Gói cho Applicant
('Applicant Basic Plan',
 'Applicants can use AI-powered scholarship search for 7 days.',
 4.99,
 'USD',
 7,
 'APPLICANT',
 '["AI_SCHOLARSHIP_SEARCH"]',
 'system'),

('Applicant Standard Plan',
 'Applicants can use AI-powered scholarship search for 30 days.',
 9.99,
 'USD',
 30,
 'APPLICANT',
 '["AI_SCHOLARSHIP_SEARCH"]',
 'system'),

('Applicant Premium Plan',
 'Applicants can use AI-powered scholarship search for 90 days.',
 24.99,
 'USD',
 90,
 'APPLICANT',
 '["AI_SCHOLARSHIP_SEARCH"]',
 'system'),

-- Gói cho Provider
('Provider Basic Plan',
 'Providers can subscribe to access AI candidate matching and advanced filtering for 7 days.',
 9.99,
 'USD',
 7,
 'PROVIDER',
 '["AI_CANDIDATE_MATCHING","APPLICATION_FILTERING"]',
 'system'),

('Provider Standard Plan',
 'Providers can subscribe to access AI candidate matching and advanced filtering for 30 days.',
 19.99,
 'USD',
 30,
 'PROVIDER',
 '["AI_CANDIDATE_MATCHING","APPLICATION_FILTERING"]',
 'system'),

('Provider Premium Plan',
 'Providers can subscribe to access AI candidate matching and advanced filtering for 90 days.',
 49.99,
 'USD',
 90,
 'PROVIDER',
 '["AI_CANDIDATE_MATCHING","APPLICATION_FILTERING"]',
 'system');
