<#import "template.ftl" as layout>
<@layout.registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=true; section>
    <#if section = "header">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Complete your profile</h1>
        <p class="text-sm text-gray-600">
            Please review and complete your profile information from Google
        </p>
    <#elseif section = "form">
        <!-- Profile Review Form -->
        <form id="kc-idp-review-profile-form" action="${url.loginAction}" method="post" novalidate autocomplete="off">

            <#if profile.attributes??>
                <#list profile.attributes as attribute>
                    <#if attribute.name == 'firstName' || attribute.name == 'lastName'>
                        <!-- First Name and Last Name in grid -->
                        <#if attribute.name == 'firstName'>
                            <div class="grid grid-cols-2 gap-3 mb-3">
                                <!-- First Name Input -->
                                <div>
                                    <label for="firstName" class="block text-xs font-medium text-gray-700 mb-1.5">
                                        First Name<#if attribute.required>*</#if>
                                    </label>
                                    <#if messagesPerField.existsError('firstName')>
                                        <span class="text-xs text-red-600 block mb-1">${kcSanitize(messagesPerField.get('firstName'))?no_esc}</span>
                                    </#if>
                                    <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            autocomplete="given-name"
                                            placeholder="John"
                                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                            value="${(attribute.value!'')}"
                                            <#if attribute.readOnly>readonly</#if>
                                            <#if attribute.required>required</#if>
                                    />
                                </div>

                                <!-- Last Name Input -->
                                <#assign lastNameAttr = ''>
                                <#list profile.attributes as attr>
                                    <#if attr.name == 'lastName'>
                                        <#assign lastNameAttr = attr>
                                        <#break>
                                    </#if>
                                </#list>
                                <div>
                                    <label for="lastName" class="block text-xs font-medium text-gray-700 mb-1.5">
                                        Last Name<#if lastNameAttr != '' && lastNameAttr.required>*</#if>
                                    </label>
                                    <#if messagesPerField.existsError('lastName')>
                                        <span class="text-xs text-red-600 block mb-1">${kcSanitize(messagesPerField.get('lastName'))?no_esc}</span>
                                    </#if>
                                    <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            autocomplete="family-name"
                                            placeholder="Doe"
                                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                            value="${(lastNameAttr.value!'')}"
                                            <#if lastNameAttr != '' && lastNameAttr.readOnly>readonly</#if>
                                            <#if lastNameAttr != '' && lastNameAttr.required>required</#if>
                                    />
                                </div>
                            </div>
                        </#if>
                    <#elseif attribute.name == 'email'>
                        <!-- Email Input -->
                        <div class="mb-3">
                            <label for="email" class="block text-xs font-medium text-gray-700 mb-1.5">
                                Email<#if attribute.required>*</#if>
                            </label>
                            <#if messagesPerField.existsError('email')>
                                <span class="text-xs text-red-600 block mb-1">${kcSanitize(messagesPerField.get('email'))?no_esc}</span>
                            </#if>
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
                                        value="${(attribute.value!'')}"
                                        <#if attribute.readOnly>readonly</#if>
                                        <#if attribute.required>required</#if>
                                />
                            </div>
                        </div>
                    <#elseif attribute.name == 'username'>
                        <!-- Username Input -->
                        <div class="mb-3">
                            <label for="username" class="block text-xs font-medium text-gray-700 mb-1.5">
                                Username<#if attribute.required>*</#if>
                            </label>
                            <#if messagesPerField.existsError('username')>
                                <span class="text-xs text-red-600 block mb-1">${kcSanitize(messagesPerField.get('username'))?no_esc}</span>
                            </#if>
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
                                        value="${(attribute.value!'')}"
                                        <#if attribute.readOnly>readonly</#if>
                                        <#if attribute.required>required</#if>
                                />
                            </div>
                        </div>
                    <#elseif attribute.name != 'lastName'>
                        <!-- Other attributes -->
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
                                <input id="${attribute.name}" name="${attribute.name}"
                                       type="text"
                                       value="${(attribute.value!'')}"
                                       class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-brand focus:border-transparent outline-none"
                                       <#if attribute.readOnly>readonly</#if>
                                        <#if attribute.required>required</#if>
                                       placeholder="${advancedMsg(attribute.annotations.inputHelperTextBefore!'')}" />
                            </#if>
                        </div>
                    </#if>
                </#list>
            </#if>

            <!-- Submit Button -->
            <button id="submit-btn"
                    class="w-full bg-primary-brand text-white py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-primary-brand-dark transition-colors mb-3"
                    type="submit">Complete Profile</button>
        </form>

        <!-- Footer message -->
        <p class="text-xs text-gray-600 text-center mt-4">
            Your information is secure and will only be used to improve your EduMatch experience.
        </p>
    </#if>
</@layout.registrationLayout>