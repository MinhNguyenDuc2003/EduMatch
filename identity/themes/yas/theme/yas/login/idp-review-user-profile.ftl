<#import "template.ftl" as layout>
<@layout.registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=true; section>
    <#if section = "form">
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>EduMatch - Complete your profile</title>
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
                .error-text {
                    display: none;
                    color: #b00020;
                    font-size: 13px;
                    margin-bottom: 3px;
                    font-weight: 500;
                }
                .disabled { opacity: 0.6; pointer-events: none; }
            </style>
        </head>
        <body class="min-h-screen bg-zinc-200 p-3 sm:p-6">
        <div class="flex flex-col lg:flex-row-reverse min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-3rem)] lg:h-[calc(100vh-3rem)] rounded-lg bg-white shadow-lg overflow-hidden p-4 sm:p-6 lg:p-8">
            <!-- Right Section: Profile Review Form -->
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

                    <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">${msg("loginIdpReviewProfileTitle")}</h1>
                    <p class="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">
                        ${msg("loginIdpReviewProfileMessage")?no_esc}
                    </p>

                    <!-- Server Messages -->
                    <#if message?has_content>
                        <div class="text-xs text-red-600 block mb-2" aria-live="assertive">
                            ${message.summary?no_esc}
                        </div>
                    </#if>

                    <!-- Profile Review Form -->
                    <form id="kc-idp-review-profile-form" action="${url.loginAction}" method="post" novalidate autocomplete="off">

                        <#if profile.attributes??>
                            <#list profile.attributes as attribute>
                                <#assign groupDisplayHeader = attribute.group!''>
                                <#if groupDisplayHeader != ''>
                                    <div class="text-sm font-semibold text-gray-700 mb-2 mt-4">${advancedMsg(groupDisplayHeader)!}</div>
                                </#if>

                                <div class="mb-3">
                                    <label for="${attribute.name}" class="block text-xs font-medium text-gray-700 mb-1.5">
                                        ${advancedMsg(attribute.displayName!'')}
                                        <#if attribute.required>*</#if>
                                    </label>

                                    <#if messagesPerField.existsError('${attribute.name}')>
                                        <span class="text-xs text-red-600 block mb-1">${kcSanitize(messagesPerField.get('${attribute.name}'))?no_esc}</span>
                                    </#if>

                                    <#if attribute.annotations.inputType?? && attribute.annotations.inputType == 'select'>
                                        <select id="${attribute.name}" name="${attribute.name}"
                                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                                <#if attribute.readOnly>disabled</#if>
                                                <#if attribute.required>required</#if>>
                                            <#if attribute.annotations.inputOptionsFromValidation?? && attribute.annotations.inputOptionsFromValidation?has_content>
                                                <#assign options = attribute.annotations.inputOptionsFromValidation>
                                            <#else>
                                                <#assign options = attribute.validators.options.options![]>
                                            </#if>
                                            <#list options as option>
                                                <option value="${option}" <#if (attribute.value!'') == option>selected</#if>>${advancedMsg(option)}</option>
                                            </#list>
                                        </select>
                                    <#elseif attribute.annotations.inputType?? && attribute.annotations.inputType == 'textarea'>
                                        <textarea id="${attribute.name}" name="${attribute.name}"
                                                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                                  rows="3"
                                                  <#if attribute.readOnly>readonly</#if>
                                                <#if attribute.required>required</#if>
                                          placeholder="${advancedMsg(attribute.annotations.inputHelperTextBefore!'')}">${(attribute.value!'')}</textarea>
                                    <#else>
                                        <#if attribute.name == 'email'>
                                            <div class="relative">
                                                <svg class="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                </svg>
                                                <input id="${attribute.name}" name="${attribute.name}"
                                                       type="email"
                                                       value="${(attribute.value!'')}"
                                                       class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                                       <#if attribute.readOnly>readonly</#if>
                                                        <#if attribute.required>required</#if>
                                                       placeholder="${advancedMsg(attribute.annotations.inputHelperTextBefore!'')}" />
                                            </div>
                                        <#elseif attribute.name == 'username'>
                                            <div class="relative">
                                                <svg class="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                </svg>
                                                <input id="${attribute.name}" name="${attribute.name}"
                                                       type="text"
                                                       value="${(attribute.value!'')}"
                                                       class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                                       <#if attribute.readOnly>readonly</#if>
                                                        <#if attribute.required>required</#if>
                                                       placeholder="${advancedMsg(attribute.annotations.inputHelperTextBefore!'')}" />
                                            </div>
                                        <#else>
                                            <input id="${attribute.name}" name="${attribute.name}"
                                                   type="text"
                                                   value="${(attribute.value!'')}"
                                                   class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                                   <#if attribute.readOnly>readonly</#if>
                                                    <#if attribute.required>required</#if>
                                                   placeholder="${advancedMsg(attribute.annotations.inputHelperTextBefore!'')}" />
                                        </#if>
                                    </#if>
                                </div>
                            </#list>
                        </#if>

                        <!-- Submit Button -->
                        <button type="submit"
                                class="w-full bg-primary-brand text-white py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-primary-brand-dark transition-colors mb-3">
                            ${msg("doSubmit")}
                        </button>
                    </form>
                </div>
            </div>

            <!-- Left Section: Image (same as register) -->
            <div class="hidden lg:flex w-full md:w-1/2 gradient-bg items-center justify-center relative overflow-hidden rounded-lg min-h-[200px] md:min-h-0">
                <img src="https://cl2h8yilb0.ufs.sh/f/9iOVh1BwOhmu2lCz8gWiO4Re0LZjQvhWg93SMAaoG2CrK1BI"
                     alt="Education and scholarship illustration"
                     class="w-full h-full object-cover" />
            </div>
        </div>
        </body>
        </html>
    </#if>
</@layout.registrationLayout>