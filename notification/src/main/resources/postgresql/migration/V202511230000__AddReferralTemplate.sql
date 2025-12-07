INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('You’ve Been Referred for a Scholarship from {{providerName}}',
        '{{providerName}} has just referred a new scholarship titled "{{scholarshipName}}". Check it out and apply now!',
        'APPLICATION_REFERRAL');
