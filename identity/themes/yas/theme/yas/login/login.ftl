<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EduMatch | Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${url.resourcesPath}/css/login.css" />
</head>
<body>
<div class="login-container">
    <!-- Illustration -->
    <div class="illustration">
        <img src="${url.resourcesPath}/img/edumatch-illustration.png" alt="EduMatch illustration">
    </div>

    <!-- Form -->
    <div class="form-side">
        <div class="form-box">
            <img src="${url.resourcesPath}/img/edumatch-logo.png" alt="EduMatch logo" class="logo">
            <p class="tagline">Find your scholarship, build your future ✨</p>
            <form id="kc-form-login" action="${url.loginAction}" method="post">
            <div class="input-group">
                    <label for="username">Username</label>
                    <input tabindex="1" id="username" name="username" class="login-field" type="text" autofocus
                           value="${(login.username!'')}" placeholder="Enter username" />
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input tabindex="2" id="password" name="password" class="login-field" type="password" placeholder="Enter password" />
                </div>

                <button tabindex="3" type="submit" class="btn submit" name="login">Login</button>
            </form>

            <div class="form-footer">
                <a href="${url.registrationUrl}" class="register-link">Create Account</a>
            </div>

            <p class="copyright">© EduMatch 2025</p>
        </div>
    </div>
</div>
</body>
</html>
