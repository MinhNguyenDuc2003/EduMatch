<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduMatch - Log in to your account</title>
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
        .gradient-bg {
            background: linear-gradient(135deg, #3d6cb9 0%, #5a8dd4 100%);
        }
        .error-text {
            display: none;
            color: #b00020;
            font-size: 13px;
            margin-bottom: 3px;
            font-weight: 500;
        }
        .disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    </style>
</head>
<body class="min-h-screen bg-zinc-200 p-3 sm:p-6">
<div class="flex flex-col lg:flex-row min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-3rem)] lg:h-[calc(100vh-3rem)] rounded-lg bg-white shadow-lg overflow-hidden p-4 sm:p-6 lg:p-8">
    <!-- Left Section: Login Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
        <div class="max-w-sm mx-auto w-full">

            <!-- Logo -->
            <div class="flex items-center gap-2 mb-4 sm:mb-5">
                <img src="https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH" alt="EduMatch logo"
                     class="w-10 h-8 sm:w-12 sm:h-10 object-contain" />
                <div class="flex items-center gap-0.5">
                    <span class="text-lg sm:text-xl font-semibold text-gray-900">Edu</span>
                    <span class="text-lg sm:text-xl font-bold text-primary-brand">Match</span>
                </div>
            </div>

            <!-- Title & tagline -->
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                Log in to your account
            </h1>
            <p class="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">
                Find your scholarship, build your future ✨
            </p>

            <!-- Server error message (Keycloak truyền message) -->
            <#if message?has_content>
                <div id="server-error"
                     class="text-xs text-red-600 block mb-2"
                     aria-live="assertive">Username or password is not correct</div>
            </#if>

            <!-- Login Form -->
            <form id="kc-form-login" action="${url.loginAction}" method="post" novalidate autocomplete="off">
                <!-- Username Input -->
                <div class="mb-4">
                    <label class="block text-xs font-medium text-gray-700 mb-1.5" for="username">Username</label>
                    <span id="err-username" class="error-text"></span>
                    <div class="relative">
                        <svg class="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <input
                                id="username"
                                name="username"
                                tabindex="1"
                                type="text"
                                autocomplete="username"
                                class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none login-field"
                                placeholder="Enter your username"
                                value="${(login.username!'')}" autofocus required
                        />
                    </div>
                </div>

                <!-- Password Input -->
                <div class="mb-4">
                    <label class="block text-xs font-medium text-gray-700 mb-1.5" for="password">Password</label>
                    <span id="err-password" class="error-text"></span>
                    <div class="relative">
                        <input
                                id="password"
                                name="password"
                                tabindex="2"
                                type="password"
                                autocomplete="current-password"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none login-field"
                                placeholder="Enter your password"
                                required
                        />
                    </div>
                </div>

                <!-- Forgot Password -->
                <div class="flex items-center justify-end mb-4">
                    <a href="${url.passwordResetUrl!}" class="text-xs text-primary-brand hover:underline">Forgot password?</a>
                </div>

                <!-- Login Button -->
                <button tabindex="3" id="login-btn" type="submit"
                        class="w-full bg-primary-brand text-white py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-primary-brand-dark transition-colors mb-3 btn submit" name="login">
                    Log in
                </button>
            </form>

            <!-- OR Separator -->
            <div class="flex items-center my-3">
                <div class="flex-1 border-t border-gray-300"></div>
                <span class="px-3 text-xs text-gray-500">OR</span>
                <div class="flex-1 border-t border-gray-300"></div>
            </div>

            <!-- Google Login Button (nếu có provider Google, hoặc các social khác) -->
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
                            Log in with ${p.displayName}
                        </button>
                    </form>
                </#list>
            </#if>

            <!-- Sign Up Link -->
            <p class="text-xs text-gray-600 text-center">
                Don't have an account?
                <a href="${url.registrationUrl!}" class="text-primary-brand font-medium hover:underline ml-1">Sign up</a>
            </p>
        </div>
    </div>

    <!-- Right Section: Image, chỉ hiện với desktop -->
    <div class="hidden lg:flex w-full md:w-1/2 gradient-bg items-center justify-center relative overflow-hidden rounded-lg min-h-[200px] md:min-h-0">
        <img src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmu2lCz8gWiO4Re0LZjQvhWg93SMAaoG2CrK1BI"
             alt="Education and scholarship illustration"
             class="w-full h-full object-cover" />
    </div>
</div>

<!-- JS Validate, nâng cấp để hiện lỗi đẹp phía trên input -->
<script>
    (function(){
        const form = document.getElementById('kc-form-login');
        const btn = document.getElementById('login-btn');
        const serverErr = document.getElementById('server-error');
        const errUser = document.getElementById('err-username');
        const errPass = document.getElementById('err-password');
        function clearErrors(){
            if(serverErr) serverErr.style.display = 'none';
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
            if(ok && password.length < 6){
                showFieldError(errPass, 'Password must be at least 6 characters');
                ok = false;
            }
            if(!ok){
                if(errUser.style.display === 'block') form.username.focus();
                else if(errPass.style.display === 'block') form.password.focus();
                return;
            }
            btn.disabled = true;
            btn.classList.add('disabled');
            form.submit();
        });
        form.username.addEventListener('input', function(){
            errUser.style.display='none';
            if(serverErr) serverErr.style.display='none';
        });
        form.password.addEventListener('input', function(){
            errPass.style.display='none';
            if(serverErr) serverErr.style.display='none';
        });
    })();
</script>
</body>
</html>