CREATE SCHEMA IF NOT EXISTS media;

CREATE TABLE IF NOT EXISTS media.MEDIA (
ID                              BIGSERIAL           PRIMARY KEY,
S3_KEY                          VARCHAR(500)        NULL,
CONTENT_TYPE                    VARCHAR(100)        NULL,
SIZE                            BIGINT              NULL,
FOLDER_NAME                     VARCHAR(200)        NULL,
FILE_NAME                       VARCHAR(200)        NULL,
IS_PUBLIC                       BOOLEAN             NULL,
CREATED_BY                      VARCHAR(32) DEFAULT '',
UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    VERSION NUMERIC NOT NULL DEFAULT 0,
    CREATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS media.mail_template (
    ID                              BIGSERIAL           PRIMARY KEY,
    TYPE                            VARCHAR(100)        NULL,
    SUBJECT                         VARCHAR(500)        NULL,
    BODY                            TEXT                NULL,
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    VERSION NUMERIC NOT NULL DEFAULT 0,
    CREATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media.mail (
    ID                              BIGSERIAL           PRIMARY KEY,
    TEMPLATE_ID                     BIGINT              NULL,
    FROM_MAIL                       VARCHAR(500)        NULL,
    TO_MAIL                         VARCHAR(500)        NULL,
    CREATED_BY                      VARCHAR(32) DEFAULT '',
    UPDATED_BY                      VARCHAR(32) DEFAULT '',
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    VERSION NUMERIC NOT NULL DEFAULT 0,
    CREATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('APPLICATION_UPDATED',
        'Edumatch: Your application status has been updated',
        '<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EduMatch | Application Status Update</title>
  <meta name="color-scheme" content="light only" />
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <!-- Banner Section -->
          <tr>
            <td style="background: linear-gradient(to right, #dbeafe, #e0e7ff, #ede9fe); padding: 20px 24px; position: relative;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="40%" valign="middle">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH" alt="EduMatch" style="height: 36px; display: block;" /></td>
                        <td style="padding-left: 8px; font-size: 18px; font-weight: 500; color: #111827;">Edu</td>
                        <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match</td>
                      </tr>
                    </table>
                  </td>
                  <td width="60%" align="right" valign="middle">
                    <table cellpadding="0" cellspacing="0" align="right">
                      <tr>
                        <td style="font-size: 24px; font-weight: 700; color: #111827; text-align: right;">
                          Application
                          <span style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-left: 8px;">Status Update</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content Section -->
          <tr>
            <td style="padding: 40px 24px;">
              <h2 style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 24px 0;">Application Updated</h2>
              <p style="text-align: center; font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0;">
                Your application for
                <span style="font-weight: 600; color: #2563eb;">{{scholarshipName}}</span> at
                <span style="font-weight: 600; color: #2563eb;">{{UniversityName}}</span> has been
                <span style="font-weight: 600; color: #059669;">{{status}}</span>.
              </p>
            </td>
          </tr>
          
          <!-- Button Section -->
          <tr>
            <td align="center" style="padding: 0 24px 40px 24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                    <a href="{{link}}" style="display: inline-block; padding: 12px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                      View Details →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
');

INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('SCHOLARSHIP_RECOMMENDATION',
        'Edumatch: Your Personalized Scholarship Matches Are Ready',
        '<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch | Scholarships Digest</title>
    <meta name="color-scheme" content="light only" />
</head>

<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="720" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #bfdbfe, #c7d2fe, #ddd6fe); padding: 20px 32px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50%" valign="top">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                                                        alt="EduMatch" style="height: 32px; display: block;" /></td>
                                                <td style="padding-left: 8px; font-size: 18px; color: #111827;">Edu</td>
                                                <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match
                                                </td>
                                            </tr>
                                        </table>
                                        <h1 style="font-size: 26px; font-weight: 700; color: #111827; margin: 12px 0 8px 0; line-height: 1.2;">
                                            Discover your next
                                            <span style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Scholarship</span>
                                            Match
                                        </h1>
                                        <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.5;">
                                            Curated opportunities that align with your goals. Explore highlights below.
                                        </p>
                                    </td>
                                    <td width="50%" align="center" valign="middle">
                                        <img src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmuTL4YymgyGNugpcXndArbzQ90R1wZqIk5B2Lt"
                                            alt="Student Success"
                                            style="width: 224px; height: 224px; border-radius: 16px; object-fit: cover;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 24px 32px;">
                            <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Featured Scholarships</h2>
                            <p style="font-size: 14px; color: #4b5563; margin: 0 0 24px 0;">Handpicked opportunities you may be interested in.</p>


                            <!-- Scholarship block 1 -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link1}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                            {{title1}}</div>
                                                        <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                            {{university1}}</div>
                                                        <div style="font-size: 14px; color: #4b5563;">{{description1}}</div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Amount:</span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">
                                                            {{amount1}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Deadline:</span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline1}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Scholarship block 2 -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link2}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                            {{title2}}</div>
                                                        <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                            {{university2}}</div>
                                                        <div style="font-size: 14px; color: #4b5563;">{{description2}}</div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Amount:</span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">
                                                            {{amount2}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Deadline:</span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline2}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Scholarship block 3 -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link3}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                            {{title3}}</div>
                                                        <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                            {{university3}}</div>
                                                        <div style="font-size: 14px; color: #4b5563;">{{description3}}</div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Amount:</span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">
                                                            {{amount3}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Deadline:</span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline3}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Scholarship block 4 -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link4}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                            {{title4}}</div>
                                                        <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                            {{university4}}</div>
                                                        <div style="font-size: 14px; color: #4b5563;">{{description4}}</div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Amount:</span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">
                                                            {{amount4}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Deadline:</span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline4}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Scholarship block 5 -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link5}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                            {{title5}}</div>
                                                        <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                            {{university5}}</div>
                                                        <div style="font-size: 14px; color: #4b5563;">{{description5}}</div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Amount:</span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">
                                                            {{amount5}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span style="color: #6b7280;">Deadline:</span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline5}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 0 24px 40px 24px;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                                        <a href="{{link}}" style="display: inline-block; padding: 12px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                                            Explore more Scholarships →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 24px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #4b5563;">
                            You are receiving this email because you are interested in scholarships.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>');

INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('PROVIDER_APPROVED',
        'Edumatch: Your Profile Has Been Successfully Verified',
        '<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch | Profile Verified</title>
    <meta name="color-scheme" content="light only" />
</head>

<body
    style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <!-- Banner -->
                    <tr>
                        <td
                            style="background: linear-gradient(to right, #dbeafe, #e0e7ff, #ede9fe); padding: 20px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="40%" valign="middle">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                                                        alt="EduMatch" style="height: 36px; display: block;" /></td>
                                                <td
                                                    style="padding-left: 8px; font-size: 18px; font-weight: 500; color: #111827;">
                                                    Edu</td>
                                                <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="60%" align="right" valign="middle">
                                        <table cellpadding="0" cellspacing="0" align="right">
                                            <tr>
                                                <td
                                                    style="font-size: 24px; font-weight: 700; color: #111827; text-align: right;">
                                                    Notification of
                                                    <span
                                                        style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-left: 8px;">Profile
                                                        Verified</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Success Section -->
                    <tr>
                        <td style="padding: 40px 24px;">
                            <!-- Success Icon -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td
                                                    style="width: 80px; height: 80px; background: linear-gradient(135deg, #dbeafe, #e0e7ff); border-radius: 50%; text-align: center; vertical-align: middle;">
                                                    <span style="font-size: 36px; color: #2563eb;">✓</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <h2
                                style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 24px 0;">
                                Verified Profile Successfully</h2>

                            <p
                                style="text-align: center; font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
                                Your profile now displays the official
                                <span style="font-weight: 600; color: #2563eb;">"Verified Badge."</span> This
                                immediately
                                signals to the applicant that your institution is legitimate and trustworthy, setting
                                you apart from non-verified accounts.
                            </p>

                            <!-- Benefits Card -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background: linear-gradient(135deg, #eff6ff, #eef2ff); border: 1px solid #dbeafe; border-radius: 12px; margin-top: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h3
                                            style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">
                                            What this means for you:</h3>

                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-bottom: 12px;">
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td
                                                                style="padding-left: 12px; font-size: 14px; color: #374151;">
                                                                Increased trust and credibility with applicants
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 12px;">
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td
                                                                style="padding-left: 12px; font-size: 14px; color: #374151;">
                                                                Stand out from non-verified institutions
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td
                                                                style="padding-left: 12px; font-size: 14px; color: #374151;">
                                                                Enhanced visibility in search results
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Button Section -->
                    <tr>
                        <td align="center" style="padding: 0 24px 40px 24px;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td
                                        style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                                        <a href="{{link}}"
                                            style="display: inline-block; padding: 12px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                                            View Profile →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>');

INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('SUBSCRIPTION_EXPIRING',
        'Edumatch: Your Subscription Will Expire in 5 Days',
        '<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch | Subscription Expiring</title>
    <meta name="color-scheme" content="light only" />
</head>

<body
    style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <!-- Banner -->
                    <tr>
                        <td
                            style="background: linear-gradient(to right, #dbeafe, #e0e7ff, #ede9fe); padding: 20px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="40%" valign="middle">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                                                        alt="EduMatch" style="height: 36px; display: block;" /></td>
                                                <td
                                                    style="padding-left: 8px; font-size: 18px; font-weight: 500; color: #111827;">
                                                    Edu</td>
                                                <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="60%" align="right" valign="middle">
                                        <table cellpadding="0" cellspacing="0" align="right">
                                            <tr>
                                                <td
                                                    style="font-size: 24px; font-weight: 700; color: #111827; text-align: right;">
                                                    Subscription
                                                    <span
                                                        style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-left: 8px;">Expiring
                                                        Soon</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Expiring Section -->
                    <tr>
                        <td style="padding: 40px 24px;">
                            <h2
                                style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 24px 0;">
                                Your Subscription Expires Soon</h2>

                            <p
                                style="text-align: center; font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
                                Your <span style="font-weight: 600; color: #2563eb;">Premium Subscription</span> will
                                expire
                                on <span style="font-weight: 600; color: #d97706;">{{expireDate}}</span>. Renew now to
                                continue enjoying all premium features without interruption.
                            </p>

                            <!-- Subscription Details Card -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background: linear-gradient(135deg, #eff6ff, #eef2ff); border: 1px solid #dbeafe; border-radius: 12px; margin-top: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h3
                                            style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 16px 0;">
                                            Subscription Details:</h3>

                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-bottom: 12px;">
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td
                                                                style="padding-left: 12px; font-size: 14px; color: #374151;">
                                                                <div style="font-weight: 500; margin-bottom: 2px;">
                                                                    Expires: {{expireDate}}</div>
                                                                <div style="font-size: 12px; color: #6b7280;">Days
                                                                    remaining: 5 days</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 12px;">
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td
                                                                style="padding-left: 12px; font-size: 14px; color: #374151;">
                                                                <div style="font-weight: 500; margin-bottom: 2px;">
                                                                    Premium Features</div>
                                                                <div style="font-size: 12px; color: #6b7280;">Unlimited
                                                                    applications, priority support, and exclusive
                                                                    scholarships</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td
                                                                style="padding-left: 12px; font-size: 14px; color: #374151;">
                                                                <div style="font-weight: 500; margin-bottom: 2px;">
                                                                    Renewal Price</div>
                                                                <div style="font-size: 12px; color: #6b7280;">Continue
                                                                    at the same great rate</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Button Section -->
                    <tr>
                        <td align="center" style="padding: 0 24px 40px 24px;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td
                                        style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                                        <a href="{{link}}"
                                            style="display: inline-block; padding: 12px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                                            View Subscription →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>');

INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('APPLICATION_SUBMITTED',
        'Edumatch: Your application submitted successfully',
        '<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch | Application Submitted</title>
    <meta name="color-scheme" content="light only" />
</head>

<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="720" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #bfdbfe, #c7d2fe, #ddd6fe); padding: 20px 32px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50%" valign="top">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                                                        alt="EduMatch" style="height: 32px; display: block;" /></td>
                                                <td style="padding-left: 8px; font-size: 18px; color: #111827;">Edu</td>
                                                <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match</td>
                                            </tr>
                                        </table>
                                        <h1 style="font-size: 26px; font-weight: 700; color: #111827; margin: 12px 0 8px 0; line-height: 1.2;">
                                            Discover your next
                                            <span style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Scholarship</span>
                                            Match
                                        </h1>
                                        <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.5;">
                                            Curated opportunities that align with your goals. Explore highlights below.
                                        </p>
                                    </td>
                                    <td width="50%" align="center" valign="middle">
                                        <img src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmuTL4YymgyGNugpcXndArbzQ90R1wZqIk5B2Lt"
                                            alt="Student Success"
                                            style="width: 224px; height: 224px; border-radius: 16px; object-fit: cover;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 32px;">
                            <h2 style="font-size: 24px; font-weight: 600; color: #111827; text-align: center; margin: 0 0 16px 0;">
                                Successful Application</h2>
                            <div style="margin-bottom: 16px; font-size: 16px; color: #374151;">
                                <span>Hi, </span><span style="font-weight: 700;">{{fullname}}</span>
                            </div>
                            <div style="margin-bottom: 24px; font-size: 16px; color: #374151;">
                                <span>Your application has been sent to </span><span
                                    style="font-weight: 700;">{{universityName}}</span>
                            </div>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-left: 16px;">
                                                    <a href="{{link}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                                        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                            {{scholarshipName}}</div>
                                                        <div style="font-size: 14px; font-style: italic; color: #4b5563; margin-bottom: 4px;">
                                                            {{universityName}}</div>
                                                        <div style="font-size: 14px; color: #4b5563;">
                                                            <span>Description: </span><span>{{description}}</span>
                                                        </div>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <table width="100%" cellpadding="0" cellspacing="0"
                                            style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                            <tr>
                                                <td style="font-size: 14px; color: #6b7280;">
                                                    <span>Amount: </span>
                                                    <span style="color: #059669; font-weight: 600; font-size: 16px;">$ {{amount}}</span>
                                                </td>
                                                <td align="right" style="font-size: 14px; color: #6b7280;">
                                                    <span>Deadline: </span>
                                                    <span style="color: #2563eb; font-weight: 500;">{{deadline}}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <div style="font-size: 14px; color: #4b5563; margin-bottom: 24px;">
                                The organization will evaluate and notify you as soon as possible if your application is suitable.
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 24px 32px; border-top: 1px solid #e5e7eb;">
                            <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Featured Scholarships</h2>
                            <p style="font-size: 14px; color: #4b5563; margin: 0 0 16px 0;">Handpicked opportunities you may be interested in.</p>

                            <!-- Correct scholarship blocks loop for email HTML -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link1}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                {{title1}}</div>
                                            <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                {{university1}}</div>
                                            <div style="font-size: 14px; color: #4b5563;">{{description1}}</div>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span>Amount: </span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">$ {{amount1}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span>Deadline: </span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline1}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link2}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                {{title2}}</div>
                                            <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                {{university2}}</div>
                                            <div style="font-size: 14px; color: #4b5563;">{{description2}}</div>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span>Amount: </span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">$ {{amount2}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span>Deadline: </span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline2}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link3}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                {{title3}}</div>
                                            <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                {{university3}}</div>
                                            <div style="font-size: 14px; color: #4b5563;">{{description3}}</div>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span>Amount: </span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">$ {{amount3}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span>Deadline: </span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline3}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link4}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                {{title4}}</div>
                                            <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                {{university4}}</div>
                                            <div style="font-size: 14px; color: #4b5563;">{{description4}}</div>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span>Amount: </span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">$ {{amount4}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span>Deadline: </span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline4}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 8px;">
                                        <a href="{{link5}}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
                                            <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                {{title5}}</div>
                                            <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
                                                {{university5}}</div>
                                            <div style="font-size: 14px; color: #4b5563;">{{description5}}</div>
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                                <tr>
                                                    <td style="font-size: 14px; color: #6b7280;">
                                                        <span>Amount: </span>
                                                        <span style="color: #059669; font-weight: 600; font-size: 16px;">$ {{amount5}}</span>
                                                    </td>
                                                    <td align="right" style="font-size: 14px; color: #6b7280;">
                                                        <span>Deadline: </span>
                                                        <span style="color: #2563eb; font-weight: 500;">{{deadline5}}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 24px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #4b5563;">
                            You are receiving this email because you are interested in scholarships.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>');

INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('PROVIDER_VERIFIED',
        'Edumatch: Verification Code Delivered',
        '<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch | Verify Your Email</title>
    <meta name="color-scheme" content="light only" />
</head>

<body
    style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <!-- Banner -->
                    <tr>
                        <td
                            style="background: linear-gradient(to right, #dbeafe, #e0e7ff, #ede9fe); padding: 20px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="40%" valign="middle">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                                                        alt="EduMatch" style="height: 36px; display: block;" /></td>
                                                <td
                                                    style="padding-left: 8px; font-size: 18px; font-weight: 500; color: #111827;">
                                                    Edu</td>
                                                <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="60%" align="right" valign="middle">
                                        <table cellpadding="0" cellspacing="0" align="right">
                                            <tr>
                                                <td
                                                    style="font-size: 24px; font-weight: 700; color: #111827; text-align: right;">
                                                    Verify your
                                                    <span
                                                        style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-left: 8px;">Account</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Content Section -->
                    <tr>
                        <td style="padding: 40px 24px;">
                            <h2
                                style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 24px 0;">
                                Verification Code</h2>

                            <p
                                style="text-align: center; font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
                                Please enter the following code to verify your email address: <strong>{{code}}</strong>
                            </p>

                            <!-- Important Information Card -->
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background: linear-gradient(135deg, #eff6ff, #eef2ff); border: 1px solid #dbeafe; border-radius: 12px; margin-top: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <table cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="padding-left: 12px;">
                                                                <div
                                                                    style="font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px;">
                                                                    Important Information</div>
                                                                <div
                                                                    style="font-size: 12px; color: #4b5563; line-height: 1.5;">
                                                                    This code will expire in
                                                                    <span style="font-weight: 600; color: #3d6cb9;">10
                                                                        minutes</span>. If you didn''t
                                                                    request this code, please ignore this email.
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>');
INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('REFERRAL_APPLICATION',
        'Edumatch: Youâ€™ve Been Referred for a Scholarship',
        '<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch |  Scholarship Referral Notification</title>
    <meta name="color-scheme" content="light only" />
</head>

<body
    style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="720" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
                    <tr>
                        <td style="background: linear-gradient(135deg, #bfdbfe, #c7d2fe, #ddd6fe); padding: 20px 32px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50%" valign="top">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                                                        alt="EduMatch" style="height: 32px; display: block;" /></td>
                                                <td style="padding-left: 8px; font-size: 18px; color: #111827;">Edu</td>
                                                <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match
                                                </td>
                                            </tr>
                                        </table>
                                        <h1
                                            style="font-size: 26px; font-weight: 700; color: #111827; margin: 12px 0 8px 0; line-height: 1.2;">
                                            Discover your next
                                            <span
                                                style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Scholarship</span>
                                            Match
                                        </h1>
                                        <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.5;">
                                            Curated opportunities that align with your goals. Explore highlights below.
                                        </p>
                                    </td>
                                    <td width="50%" align="center" valign="middle">
                                        <img src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmuTL4YymgyGNugpcXndArbzQ90R1wZqIk5B2Lt"
                                            alt="Student Success"
                                            style="width: 224px; height: 224px; border-radius: 16px; object-fit: cover;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 32px;">
                            <h2
                                style="font-size: 24px; font-weight: 600; color: #111827; text-align: center; margin: 0 0 16px 0;">
                                Scholarship Referral</h2>
                            <div style="margin-bottom: 24px; font-size: 16px; color: #374151;">
                                <span>We are pleased to inform you that a scholarship provider has referred you for the following opportunity:
                            </div>

                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-left: 16px;">
                                                    <a href="{{link}}" target="_blank"
                                                        style="text-decoration: none; color: inherit; display: block;">
                                                        <div
                                                            style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 4px;">
                                                            {{scholarshipName}}</div>
                                                        <div
                                                            style="font-size: 14px; font-style: italic; color: #4b5563; margin-bottom: 4px;">
                                                            {{universityName}}</div>
                                                        <div style="font-size: 14px; color: #4b5563;">
                                                            <span>Description: </span><span>{{description}}</span>
                                                        </div>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <table width="100%" cellpadding="0" cellspacing="0"
                                            style="border-top: 1px solid #f3f4f6; padding-top: 8px; margin-top: 8px;">
                                            <tr>
                                                <td style="font-size: 14px; color: #6b7280;">
                                                    <span>Amount: </span>
                                                    <span style="color: #059669; font-weight: 600; font-size: 16px;">$
                                                        {{amount}}</span>
                                                </td>
                                                <td align="right" style="font-size: 14px; color: #6b7280;">
                                                    <span>Deadline: </span>
                                                    <span style="color: #2563eb; font-weight: 500;">{{deadline}}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 24px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #4b5563;">
                            You are receiving this email because you are interested in scholarships.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
');
INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('SUCCESSFUL_APPLICATION',
        'Edumatch: Congratulations on Your Achievement!',
        '<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch | Successful Application</title>
    <meta name="color-scheme" content="light only" />
</head>

<body
    style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, ''Segoe UI'', Roboto, ''Helvetica Neue'', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    <!-- Banner Section -->
                    <tr>
                        <td
                            style="background: linear-gradient(to right, #dbeafe, #e0e7ff, #ede9fe); padding: 20px 24px; position: relative;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="40%" valign="middle">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                                                        alt="EduMatch" style="height: 36px; display: block;" /></td>
                                                <td
                                                    style="padding-left: 8px; font-size: 18px; font-weight: 500; color: #111827;">
                                                    Edu</td>
                                                <td style="font-size: 18px; font-weight: 700; color: #1e40af;">Match
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="60%" align="right" valign="middle">
                                        <table cellpadding="0" cellspacing="0" align="right">
                                            <tr>
                                                <td
                                                    style="font-size: 24px; font-weight: 700; color: #111827; text-align: right;">
                                                    Congratulations
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Content Section -->
                    <tr>
                        <td style="padding: 40px 24px;">
                            <h2
                                style="font-size: 24px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 24px 0;">
                                Congratulations on Your Achievement!
                            </h2>
                            <p
                                style="text-align: center; font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0;">
                                We are excited to share that your application for
                                <span style="font-weight: 600; color: #2563eb;">{{scholarshipName}}</span> at
                                <span style="font-weight: 600; color: #2563eb;">{{universityName}}</span> has been
                                <span style="font-weight: 600; color: #059669;">successful</span>.
                            </p>
                            <p
                                style="text-align: center; font-size: 16px; color: #4b5563; line-height: 1.6; margin: 24px 0 0 0;">
                                This achievement reflects your hard work, dedication, and determination.
                                If you''d like, you can share your journey and inspire other students who are striving
                                toward the same goal.
                                Your story could be the spark that motivates someone else to pursue their dreams.
                            </p>
                        </td>
                    </tr>


                    <!-- Button Section -->
                    <tr>
                        <td align="center" style="padding: 0 24px 40px 24px;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td
                                        style="background: linear-gradient(to right, #2563eb, #4f46e5, #7c3aed); border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                                        <a href="{{link}}"
                                            style="display: inline-block; padding: 12px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                                            Share your journey â†’
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
');
