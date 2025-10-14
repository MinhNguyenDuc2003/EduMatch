<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />

        <title><#nested "title"></title>

        <!-- Google Font -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />

        <!-- Theme CSS -->
        <#if properties.styles?has_content>
            <#list properties.styles?split(' ') as style>
                <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
            </#list>
        </#if>

        <style>
            body {
                margin: 0;
                font-family: 'Nunito', sans-serif;
                background: #f8faff;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }

            .login-content {
                flex: 1;
                background: url("${url.resourcesPath}/img/background.svg") no-repeat center center / cover;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2rem;
            }

            .box {
                background: #fff;
                border-radius: 16px;
                box-shadow: 0px 6px 20px rgba(0,0,0,0.1);
                padding: 2rem;
                width: 100%;
                max-width: 450px;
                animation: fadeIn 0.5s ease-in-out;
            }

            .alert {
                padding: 0.8rem 1rem;
                margin-bottom: 1.2rem;
                border-radius: 8px;
                font-size: 0.9rem;
            }
            .alert-success { background: #e6ffed; color: #1a7f37; }
            .alert-warning { background: #fff8e1; color: #8a6d3b; }
            .alert-error   { background: #fdecea; color: #a94442; }
            .alert-info    { background: #e8f4fd; color: #31708f; }

            .message-text {
                margin-left: 8px;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to   { opacity: 1; transform: translateY(0); }
            }
        </style>
    </head>

    <body class="${bodyClass}">
    <#nested "header" />

    <div class="login-content">
        <div class="box">
            <#if displayMessage && message?has_content>
                <div class="alert alert-${message.type}">
                    <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                    <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                    <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                    <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                    <span class="message-text">${message.summary?no_esc}</span>
                </div>
            </#if>

            <#nested "form" />
        </div>
    </div>
    </body>
    </html>
</#macro>
