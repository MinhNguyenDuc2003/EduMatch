INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('New Scholarship from {{providerName}}',
        '{{providerName}} has just published a new scholarship titled "{{scholarshipName}}". Check it out and apply now!',
        'SCHOLARSHIP_NEW');

INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('Scholarship "{{scholarshipName}}" has been updated',
        '{{providerName}} has updated the details of "{{scholarshipName}}". View details for the latest information.',
        'SCHOLARSHIP_UPDATED');

INSERT INTO notification.NOTIFICATION_TEMPLATE
    (TITLE, CONTENT, TYPE)
VALUES ('News from {{providerName}} about "{{scholarshipName}}"',
        '{{providerName}} has published a new announcement related to the scholarship "{{scholarshipName}}": "{{newsTitle}}".',
        'SCHOLARSHIP_NEWS');
