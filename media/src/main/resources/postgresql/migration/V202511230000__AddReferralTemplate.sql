INSERT INTO media.MAIL_TEMPLATE (TYPE, SUBJECT, BODY)
VALUES ('REFERRAL_APPLICATION',
        'Edumatch: You’ve Been Referred for a Scholarship',
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