INSERT INTO subscription.subscription_plan
(name, description, price, currency, duration_days, target_type, features, created_by)
VALUES ('Applicant Premium Plan',
        'Applicants can purchase a premium plan to access AI-powered recommendations for scholarships and research labs based on their profile. The system automatically calculates and displays a matching score between the applicant''s profile and each program''s eligibility criteria.',
        9.99,
        'USD',
        30,
        'APPLICANT',
        'AI_MATCHING,PROFILE_SCORING,SCHOLARSHIP_RECOMMENDATIONS,RESEARCH_LAB_SUGGESTIONS',
        'system'),
       ('Provider Premium Plan',
        'Providers can subscribe to a premium plan to access AI-matched applicant profiles based on defined criteria, view application details, and explore AI-suggested matches for open programs or research opportunities.',
        19.99,
        'USD',
        30,
        'PROVIDER',
        'AI_MATCHED_APPLICANTS,APPLICATION_INSIGHTS,PROFILE_ACCESS,PROGRAM_ANALYTICS',
        'system');

