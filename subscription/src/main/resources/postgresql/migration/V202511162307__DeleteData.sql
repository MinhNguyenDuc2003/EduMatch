-- Xóa toàn bộ dữ liệu cũ trong bảng subscription_plan
DELETE FROM subscription.subscription_plan;

-- Thêm dữ liệu mới chỉ 30 ngày
INSERT INTO subscription.subscription_plan
(name, description, price, currency, duration_days, target_type, features, created_by)
VALUES
-- Gói 30 ngày cho Applicants
('AI Scholarship 30-Day Plan',
 'Receive AI-powered scholarship notifications and recommendations for 30 days.',
 9.99,
 'USD',
 30,
 'APPLICANT',
 '["AI_SCHOLARSHIP_NOTIFICATION","AI_SCHOLARSHIP_RECOMMENDATION"]',
 'system'),

-- Gói 30 ngày cho Providers
('AI Recruitment 30-Day Plan',
 'Post scholarships and access AI candidate recommendations with application filtering for 30 days.',
 19.99,
 'USD',
 30,
 'PROVIDER',
 '["POST_SCHOLARSHIP","AI_PROFILE_RECOMMENDATION","APPLICATION_FILTERING"]',
 'system');
