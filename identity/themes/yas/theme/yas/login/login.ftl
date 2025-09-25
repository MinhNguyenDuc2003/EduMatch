<#import "template.ftl" as layout>
<#import "components/link/primary.ftl" as linkPrimary>

<@layout.registrationLayout displayInfo=social.displayInfo; section>
    <#if section = "title">
        EduMatch | Login
    <#elseif section = "header">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>
        <link href="${url.resourcesPath}/css/login.css" rel="stylesheet"/>
        <script>
            function togglePassword() {
                const x = document.getElementById("password");
                const v = document.getElementById("vi");
                if (x.type === "password") {
                    x.type = "text";
                    v.src = "${url.resourcesPath}/img/eye.png";
                } else {
                    x.type = "password";
                    v.src = "${url.resourcesPath}/img/eye-off.png";
                }
            }
        </script>
    <#elseif section = "form">
        <div class="login-container">
            <!-- Cột trái: hình minh hoạ -->
            <div class="login-illustration">
                <img src="${url.resourcesPath}/img/edumatch-illustration.png" alt="EduMatch illustration">
            </div>

            <!-- Cột phải: form login -->
            <div class="login-box">
                <div class="logo-container">
                    <img class="logo" src="${url.resourcesPath}/img/edumatch-logo.png" alt="EduMatch Logo">
                </div>
                <p class="tagline">Find your scholarship, build your future ✨</p>

                <#if realm.password>
                    <form id="kc-form-login" class="form" action="${url.loginAction}" method="post">
                        <input id="username" class="login-field" placeholder="${msg("username")}" type="text" name="username" tabindex="1">

                        <div class="password-container">
                            <input id="password" class="login-field" placeholder="${msg("password")}" type="password" name="password" tabindex="2">
                            <label class="visibility" onclick="togglePassword()">
                                <img id="vi" src="${url.resourcesPath}/img/eye-off.png">
                            </label>
                        </div>

                        <input class="submit" type="submit" value="${msg("doLogIn")}" tabindex="3">
                    </form>
                </#if>

                <div class="register">
                    <@linkPrimary.kw href=url.registrationUrl>
                        <input class="register-btn" type="button" value="${msg("doRegister")}" tabindex="4">
                    </@linkPrimary.kw>
                </div>

                <p class="copyright">
                    © EduMatch ${.now?string('yyyy')}
                </p>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
