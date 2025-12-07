<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch - Create your account</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary-brand': '#3D6CB9',
                        'primary-brand-dark': '#2d5490',
                    },
                },
            },
        };
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #3d6cb9 0%, #5a8dd4 100%);}
        .tablet-shadow { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);}
        .error-text {
            display: none;
            color: #b00020;
            font-size: 13px;
            margin-bottom: 3px;
            font-weight: 500;
        }
        .disabled { opacity: 0.6; pointer-events: none; }
        .overflow-y-auto::-webkit-scrollbar { display: none;}
        .overflow-y-auto { -ms-overflow-style: none; scrollbar-width: none;}
    </style>
</head>
<body class="min-h-screen bg-zinc-200 p-3 sm:p-6">
<div class="flex flex-col lg:flex-row-reverse min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-3rem)] lg:h-[calc(100vh-3rem)] rounded-lg bg-white shadow-lg overflow-hidden p-4 sm:p-6 lg:p-8">
    <!-- Right Section: Register Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white overflow-y-auto">
        <div class="max-w-sm mx-auto w-full">
            <!-- Logo -->
            <div class="flex items-center gap-2 mb-4 sm:mb-5">
                <img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH"
                     alt="EduMatch logo"
                     class="w-10 h-8 sm:w-12 sm:h-10 object-contain" />
                <div class="flex items-center gap-0.5">
                    <span class="text-lg sm:text-xl font-semibold text-gray-900">Edu</span>
                    <span class="text-lg sm:text-xl font-bold text-primary-brand">Match</span>
                </div>
            </div>

            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">Create your account</h1>
            <p class="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">
                Join thousands of students finding their perfect scholarship match
            </p>

            <!-- Server Error (ví dụ username/email đã tồn tại) -->
            <#if message?has_content>
                <div id="server-error" class="text-xs text-red-600 block mb-2" aria-live="assertive">
                    ${message}
                </div>
            </#if>

            <!-- Register form: action/template keycloak -->
            <form id="kc-register-form" action="${url.registrationAction}" method="post" novalidate autocomplete="off">
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <!-- First Name Input -->
                    <div>
                        <label for="firstName" class="block text-xs font-medium text-gray-700 mb-1.5">First Name</label>
                        <span id="err-firstName" class="error-text"></span>
                        <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autocomplete="given-name"
                                placeholder="John"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                value="${(register.formData.firstName!'')}"
                        />
                    </div>
                    <!-- Last Name Input -->
                    <div>
                        <label for="lastName" class="block text-xs font-medium text-gray-700 mb-1.5">Last Name</label>
                        <span id="err-lastName" class="error-text"></span>
                        <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autocomplete="family-name"
                                placeholder="Doe"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                value="${(register.formData.lastName!'')}"
                        />
                    </div>
                </div>
                <!-- Email Input -->
                <div class="mb-3">
                    <label for="email" class="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                    <span id="err-email" class="error-text"></span>
                    <div class="relative">
                        <svg class="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                placeholder="john.doe@example.com"
                                class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                value="${(register.formData.email!'')}"
                        />
                    </div>
                </div>
                <!-- Username Input -->
                <div class="mb-3">
                    <label for="username" class="block text-xs font-medium text-gray-700 mb-1.5">Username</label>
                    <span id="err-username" class="error-text"></span>
                    <div class="relative">
                        <svg class="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <input
                                id="username"
                                name="username"
                                type="text"
                                autocomplete="username"
                                placeholder="johndoe"
                                class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                value="${(register.formData.username!'')}"
                        />
                    </div>
                </div>
                <!-- Password Input -->
                <div class="mb-3">
                    <label for="password" class="block text-xs font-medium text-gray-700 mb-1.5">Password</label>
                    <span id="err-password" class="error-text"></span>
                    <div class="relative">
                        <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="new-password"
                                placeholder="Enter your password"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                        />
                    </div>
                </div>
                <!-- Confirm Password Input -->
                <div class="mb-4">
                    <label for="password-confirm" class="block text-xs font-medium text-gray-700 mb-1.5">Confirm Password</label>
                    <span id="err-confirm" class="error-text"></span>
                    <div class="relative">
                        <input
                                id="password-confirm"
                                name="password-confirm"
                                type="password"
                                autocomplete="new-password"
                                placeholder="Confirm your password"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                        />
                    </div>
                </div>
                <!-- Register Button -->
                <button id="register-btn"
                        class="w-full bg-primary-brand text-white py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-primary-brand-dark transition-colors mb-3"
                        type="submit">Sign up</button>
            </form>

            <!-- OR Separator -->
            <div class="flex items-center my-3">
                <div class="flex-1 border-t border-gray-300"></div>
                <span class="px-3 text-xs text-gray-500">OR</span>
                <div class="flex-1 border-t border-gray-300"></div>
            </div>

            <!-- Google Sign Up Button (identity provider - nếu có) -->
            <#if social.providers?has_content>
                <#list social.providers as p>
                    <form action="${p.loginUrl}" method="post">
                        <button type="submit"
                                class="w-full border-2 border-gray-300 text-gray-700 py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-3"
                        >
                            <#if p.alias == "google">
                                <svg class="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            </#if>
                            Sign up with ${p.displayName}
                        </button>
                    </form>
                </#list>
            </#if>

            <!-- Log In Link -->
            <p class="text-xs text-gray-600 text-center">
                Already have an account?
                <a href="${url.loginUrl}" class="text-primary-brand font-medium hover:underline ml-1">Log in</a>
            </p>
        </div>
    </div>

    <!-- Left Section: Image -->
    <div class="hidden lg:flex w-full md:w-1/2 gradient-bg items-center justify-center relative overflow-hidden rounded-lg min-h-[200px] md:min-h-0">
        <img src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmu2lCz8gWiO4Re0LZjQvhWg93SMAaoG2CrK1BI"
             alt="Education and scholarship illustration"
             class="w-full h-full object-cover" />
    </div>
</div>
<!-- Validate JS: hiện lỗi đẹp từng field, disable nút khi submit -->
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
            confirm: document.getElementById('err-confirm'),
            server: document.getElementById('server-error')
        };
        function showFieldError(el, msg){ el.textContent = msg; el.style.display = 'block'; }
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
            if(!ok) { e.preventDefault(); return; }
            btn.disabled = true;
            btn.classList.add('disabled');
        });
        // clear error on input
        if(form.firstName) form.firstName.addEventListener('input', ()=>{ err.firstName.style.display='none'; });
        if(form.lastName) form.lastName.addEventListener('input', ()=>{ err.lastName.style.display='none'; });
        form.email.addEventListener('input', ()=>{ err.email.style.display='none'; });
        if(form.username) form.username.addEventListener('input', ()=>{ err.username.style.display='none'; });
        form.password.addEventListener('input', ()=>{ err.password.style.display='none'; });
        form['password-confirm'].addEventListener('input', ()=>{ err.confirm.style.display='none'; });
    })();
</script>
</body>
</html>