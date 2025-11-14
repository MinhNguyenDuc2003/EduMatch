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
VALUES ('News from "{{providerName}}"',
        '{{providerName}} has published a new announcement.',
        'SCHOLARSHIP_NEWS');

INSERT INTO notification.NOTIFICATION_TEMPLATE
(TITLE, CONTENT, TYPE)
VALUES ('Application status updated',
        'Your application from scholarship "{scholarshipName}" status has been updated.',
        'APPLICATION_STATUS_UPDATED');

INSERT INTO notification.NOTIFICATION_TEMPLATE
(TITLE, CONTENT, TYPE)
VALUES ('Scholarship "{scholarshipName}" has receive application',
        'Scholarship "{scholarshipName}" has receive application from {applicantName}.',
        'SCHOLARSHIP_APPLICATION');