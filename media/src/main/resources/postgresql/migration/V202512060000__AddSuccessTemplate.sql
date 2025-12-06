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
                                            Share your journey →
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