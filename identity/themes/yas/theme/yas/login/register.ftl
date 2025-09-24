<#import "template.ftl" as layout>
<#import "components/link/primary.ftl" as linkPrimary>

<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm'); section>
    <#if section = "title">
        EduMatch | Register
    <#elseif section = "header">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>
        <link href="${url.resourcesPath}/css/login.css" rel="stylesheet"/>
    <#elseif section = "form">
        <div class="login-container">
            <!-- Cột trái: Hình minh hoạ -->
            <div class="login-illustration">
                <img src="${url.resourcesPath}/img/edumatch-illustration.png" alt="EduMatch illustration">
            </div>

            <!-- Cột phải: form đăng ký -->
            <div class="login-box">
                <div class="logo-container">
                    <img class="logo" src="${url.resourcesPath}/img/edumatch-logo.png" alt="EduMatch Logo">
                </div>
                <p class="tagline">Join EduMatch – Unlock your scholarship opportunities 🚀</p>

                <form id="kc-register-form" class="form" action="${url.registrationAction}" method="post">

                    <!-- First name -->
                    <div class="input-group">
                        <input type="text" id="firstName" class="login-field" name="firstName"
                               placeholder="${msg("firstName")}"
                               value="${(register.formData.firstName!'')}"
                               aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>" />
                        <#if messagesPerField.existsError('firstName')>
                            <span class="error-message">${kcSanitize(messagesPerField.get('firstName'))?no_esc}</span>
                        </#if>
                    </div>

                    <!-- Last name -->
                    <div class="input-group">
                        <input type="text" id="lastName" class="login-field" name="lastName"
                               placeholder="${msg("lastName")}"
                               value="${(register.formData.lastName!'')}"
                               aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>" />
                        <#if messagesPerField.existsError('lastName')>
                            <span class="error-message">${kcSanitize(messagesPerField.get('lastName'))?no_esc}</span>
                        </#if>
                    </div>

                    <!-- Email -->
                    <div class="input-group">
                        <input type="text" id="email" class="login-field" name="email"
                               placeholder="${msg("email")}"
                               value="${(register.formData.email!'')}" autocomplete="email"
                               aria-invalid="<#if messagesPerField.existsError('email')>true</#if>" />
                        <#if messagesPerField.existsError('email')>
                            <span class="error-message">${kcSanitize(messagesPerField.get('email'))?no_esc}</span>
                        </#if>
                    </div>

                    <!-- Username -->
                    <#if !realm.registrationEmailAsUsername>
                        <div class="input-group">
                            <input type="text" id="username" class="login-field" name="username"
                                   placeholder="${msg("username")}"
                                   value="${(register.formData.username!'')}" autocomplete="username"
                                   aria-invalid="<#if messagesPerField.existsError('username')>true</#if>" />
                            <#if messagesPerField.existsError('username')>
                                <span class="error-message">${kcSanitize(messagesPerField.get('username'))?no_esc}</span>
                            </#if>
                        </div>
                    </#if>

                    <!-- Password -->
                    <#if passwordRequired??>
                        <div class="input-group">
                            <input type="password" id="password" class="login-field" name="password"
                                   placeholder="${msg("password")}" autocomplete="new-password"
                                   aria-invalid="<#if messagesPerField.existsError('password')>true</#if>" />
                            <#if messagesPerField.existsError('password')>
                                <span class="error-message">${kcSanitize(messagesPerField.get('password'))?no_esc}</span>
                            </#if>
                        </div>

                        <div class="input-group">
                            <input type="password" id="password-confirm" class="login-field" name="password-confirm"
                                   placeholder="${msg("passwordConfirm")}"
                                   aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>" />
                            <#if messagesPerField.existsError('password-confirm')>
                                <span class="error-message">${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}</span>
                            </#if>
                        </div>
                    </#if>

                    <!-- Recaptcha -->
                    <#if recaptchaRequired??>
                        <div class="form-group">
                            <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                        </div>
                    </#if>

                    <!-- Buttons -->
                    <div class="wrapper-button">
                        <div id="kc-form-options" class="backtologin">
                            <a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a>
                        </div>
                        <input class="submit" type="submit" value="${msg("doRegister")}" />
                    </div>
                </form>

                <p class="copyright">
                    © EduMatch ${.now?string('yyyy')}
                </p>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
