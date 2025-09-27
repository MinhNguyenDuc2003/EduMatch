<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EduMatch | Register</title>
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
<div class="register-container">
    <div class="illustration">
        <img src="${url.resourcesPath}/img/edumatch-illustration.png" alt="EduMatch illustration">
    </div>

    <div class="form-side">
        <div class="form-box">
            <img src="${url.resourcesPath}/img/edumatch-logo.png" alt="EduMatch logo" class="logo">
            <p class="tagline">Join EduMatch – Unlock your scholarship opportunities 🚀</p>

            <!-- Server error top -->
            <#if message?has_content>
                <div id="server-error" class="error" style="display:block" aria-live="assertive">${message}</div>
            </#if>

            <form id="kc-register-form" action="${url.registrationAction}" method="post" novalidate>
                <#if !realm.registrationEmailAsUsername>
                    <div class="input-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" name="firstName" class="register-field" type="text"
                               value="${(register.formData.firstName!'')}" placeholder="Enter first name" />
                        <div id="err-firstName" class="field-error">
                            <#if message?has_content && message?contains("firstName")>
                                ${message}
                            </#if>
                        </div>
                    </div>

                    <div class="input-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" name="lastName" class="register-field" type="text"
                               value="${(register.formData.lastName!'')}" placeholder="Enter last name" />
                        <div id="err-lastName" class="field-error">
                            <#if message?has_content && message?contains("lastName")>
                                ${message}
                            </#if>
                        </div>
                    </div>
                </#if>

                <div class="input-group">
                    <label for="email">Email</label>
                    <input id="email" name="email" class="register-field" type="email"
                           value="${(register.formData.email!'')}" placeholder="Enter email" />
                    <div id="err-email" class="field-error">
                        <#if message?has_content && message?contains("email")>
                            ${message}
                        </#if>
                    </div>
                </div>

                <#if !realm.registrationEmailAsUsername>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input id="username" name="username" class="register-field" type="text"
                               value="${(register.formData.username!'')}" placeholder="Enter username" />
                        <div id="err-username" class="field-error">
                            <#if message?has_content && message?contains("username")>
                                ${message}
                            </#if>
                        </div>
                    </div>
                </#if>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input id="password" name="password" class="register-field" type="password" placeholder="Enter password" />
                    <div id="err-password" class="field-error">
                        <#if message?has_content && message?contains("password")>
                            ${message}
                        </#if>
                    </div>
                </div>

                <div class="input-group">
                    <label for="password-confirm">Confirm</label>
                    <input id="password-confirm" name="password-confirm" class="register-field" type="password" placeholder="Confirm password" />
                    <div id="err-password-confirm" class="field-error">
                        <#if message?has_content && message?contains("confirm")>
                            ${message}
                        </#if>
                    </div>
                </div>

                <button id="register-btn" type="submit" class="btn submit">Register</button>
            </form>

            <div class="form-footer">
                <a href="${url.loginUrl}" class="login-link">Back to Login</a>
            </div>

            <p class="copyright">© EduMatch 2025</p>
        </div>
    </div>
</div>

<script>
    (function(){
        const form = document.getElementById('kc-register-form');
        const btn = document.getElementById('register-btn');

        const err = {
            firstName: document.getElementById('err-firstName'),
            lastName: document.getElementById('err-lastName'),
            email: document.getElementById('err-email'),
            username: document.getElementById('err-username'),
            password: document.getElementById('err-password'),
            confirm: document.getElementById('err-password-confirm'),
            server: document.getElementById('server-error')
        };

        function showFieldError(el, msg) {
            if (el) {
                el.textContent = msg;
                el.style.display = 'block';
            }
        }

        function clearErrors(){
            Object.values(err).forEach(e => { if(e){ e.style.display='none'; e.textContent=''; } });
        }

        form.addEventListener('submit', function(e){
            clearErrors(); // reset errors

            let ok = true;
            const firstName = form.firstName ? form.firstName.value.trim() : '';
            const lastName = form.lastName ? form.lastName.value.trim() : '';
            const email = form.email.value.trim();
            const username = form.username ? form.username.value.trim() : '';
            const password = form.password.value.trim();
            const confirm = form['password-confirm'].value.trim();

            if(form.firstName && !firstName){ showFieldError(err.firstName,'First name is required'); ok=false; }
            if(form.lastName && !lastName){ showFieldError(err.lastName,'Last name is required'); ok=false; }
            if(!email){ showFieldError(err.email,'Email is required'); ok=false; }
            else if(!/^[^@]+@[^@]+\.[^@]+$/.test(email)){ showFieldError(err.email,'Invalid email'); ok=false; }
            if(form.username && !username){ showFieldError(err.username,'Username is required'); ok=false; }
            if(!password){ showFieldError(err.password,'Password is required'); ok=false; }
            else if(password.length < 6){ showFieldError(err.password,'Password must be at least 6 characters'); ok=false; }
            if(!confirm){ showFieldError(err.confirm,'Please confirm password'); ok=false; }
            else if(password !== confirm){ showFieldError(err.confirm,'Passwords do not match'); ok=false; }

            if(!ok) {
                e.preventDefault(); // stop submit nếu lỗi client
                return;
            }

            btn.disabled = true;
            btn.classList.add('disabled');
        });
    })();
</script>
</body>
</html>
