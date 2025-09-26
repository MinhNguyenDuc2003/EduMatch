<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EduMatch | Register</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${url.resourcesPath}/css/login.css" />
</head>
<body>
<div class="register-container">
    <!-- Illustration -->
    <div class="illustration">
        <img src="${url.resourcesPath}/img/edumatch-illustration.png" alt="EduMatch illustration">
    </div>

    <!-- Form -->
    <div class="form-side">
        <div class="form-box">
            <img src="${url.resourcesPath}/img/edumatch-logo.png" alt="EduMatch logo" class="logo">
            <p class="tagline">Join EduMatch – Unlock your scholarship opportunities 🚀</p>

            <form id="kc-register-form" action="${url.registrationAction}" method="post">
                <#if !realm.registrationEmailAsUsername>
                    <div class="input-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" name="firstName" class="register-field" type="text"
                               value="${(register.formData.firstName!'')}" placeholder="Enter first name" />
                    </div>

                    <div class="input-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" name="lastName" class="register-field" type="text"
                               value="${(register.formData.lastName!'')}" placeholder="Enter last name" />
                    </div>
                </#if>

                <div class="input-group">
                    <label for="email">Email</label>
                    <input id="email" name="email" class="register-field" type="email"
                           value="${(register.formData.email!'')}" placeholder="Enter email" />
                </div>

                <#if !realm.registrationEmailAsUsername>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input id="username" name="username" class="register-field" type="text"
                               value="${(register.formData.username!'')}" placeholder="Enter username" />
                    </div>
                </#if>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input id="password" name="password" class="register-field" type="password" placeholder="Enter password" />
                </div>

                <div class="input-group">
                    <label for="password-confirm">Confirm</label>
                    <input id="password-confirm" name="password-confirm" class="register-field" type="password" placeholder="Confirm password" />
                </div>

                <button type="submit" class="btn submit">Register</button>
            </form>

            <div class="form-footer">
                <a href="${url.loginUrl}" class="login-link">Back to Login</a>
            </div>

            <p class="copyright">© EduMatch 2025</p>
        </div>
    </div>
</div>
</body>
</html>
