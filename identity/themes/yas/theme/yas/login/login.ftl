<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EduMatch | Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${url.resourcesPath}/css/login.css" />
    <style>
        .error {
            display: none;
            color: #b00020;
            background: #fff0f0;
            border: 1px solid #f1c0c0;
            padding: 8px 12px;
            border-radius: 6px;
            margin-bottom: 12px;
        }
        .field-error {
            display: none;
            color: #b00020;
            font-size: 0.9rem;
            margin-top: 6px;
        }
        .disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    </style>
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

            <!-- Server error message (Keycloak thường truyền message) -->
            <#if message?has_content>
                <div id="server-error" class="error" aria-live="assertive">${message}</div>
            </#if>

            <form id="kc-form-login" action="${url.loginAction}" method="post" novalidate>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input tabindex="1" id="username" name="username" class="login-field" type="text" autofocus
                           value="${(login.username!'')}" placeholder="Enter username" />
                    <div id="err-username" class="field-error" aria-live="polite"></div>
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input tabindex="2" id="password" name="password" class="login-field" type="password" placeholder="Enter password" />
                    <div id="err-password" class="field-error" aria-live="polite"></div>
                </div>

                <button tabindex="3" id="login-btn" type="submit" class="btn submit" name="login">Login</button>
            </form>

            <div class="form-footer">
                <a href="${url.registrationUrl}" class="register-link">Create Account</a>
            </div>

            <p class="copyright">© EduMatch 2025</p>
        </div>
    </div>
</div>

<script>
    (function(){
        const form = document.getElementById('kc-form-login');
        const btn = document.getElementById('login-btn');
        const serverErr = document.getElementById('server-error');
        const errUser = document.getElementById('err-username');
        const errPass = document.getElementById('err-password');

        function showServerError(msg){
            if(!serverErr){
                // nếu template không in server-error, tạo tạm
                const div = document.createElement('div');
                div.id = 'server-error';
                div.className = 'error';
                div.setAttribute('aria-live','assertive');
                div.textContent = msg;
                form.parentNode.insertBefore(div, form);
            } else {
                serverErr.textContent = msg;
                serverErr.style.display = 'block';
            }
        }

        function clearErrors(){
            if(serverErr) { serverErr.style.display = 'none'; }
            errUser.textContent = ''; errUser.style.display = 'none';
            errPass.textContent = ''; errPass.style.display = 'none';
        }

        function showFieldError(el, msg){
            el.textContent = msg;
            el.style.display = 'block';
        }

        form.addEventListener('submit', function(e){
            e.preventDefault();
            clearErrors();

            const username = (form.username.value || '').trim();
            const password = (form.password.value || '').trim();

            let ok = true;
            if(!username){
                showFieldError(errUser, 'Username is required');
                ok = false;
            }
            if(!password){
                showFieldError(errPass, 'Password is required');
                ok = false;
            }

            // optional: basic validation rules
            if (ok && password.length < 6) {
                showFieldError(errPass, 'Password must be at least 6 characters');
                ok = false;
            }

            if(!ok) {
                // focus first invalid
                if(errUser.style.display === 'block') form.username.focus();
                else if(errPass.style.display === 'block') form.password.focus();
                return;
            }

            // disable button to avoid double submit
            btn.disabled = true;
            btn.classList.add('disabled');

            // submit form (normal post to Keycloak)
            form.submit();
        });

        // clear field errors when typing
        form.username.addEventListener('input', function(){ errUser.style.display='none'; if(serverErr) serverErr.style.display='none'; });
        form.password.addEventListener('input', function(){ errPass.style.display='none'; if(serverErr) serverErr.style.display='none'; });

    })();
</script>
</body>
</html>
