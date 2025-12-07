<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />

        <title><#nested "title"></title>

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
            body {
                font-family: 'Inter', sans-serif;
                margin: 0;
                background: #f4f6f9;
            }
            .gradient-bg {
                background: linear-gradient(135deg, #3d6cb9 0%, #5a8dd4 100%);
            }
            .animate-fadeIn {
                animation: fadeIn 0.6s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .glass-effect {
                backdrop-filter: blur(10px);
                background: rgba(255, 255, 255, 0.95);
            }
            .shadow-custom {
                box-shadow: 0 20px 60px -12px rgba(0, 0, 0, 0.15);
            }
            .input-focus:focus {
                transform: translateY(-1px);
                box-shadow: 0 8px 25px -8px rgba(61, 108, 185, 0.3);
            }
            .btn-hover:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px -8px rgba(61, 108, 185, 0.4);
            }
        </style>
    </head>

    <body class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${bodyClass}">
    <!-- Background Pattern -->
    <div class="fixed inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #3d6cb9 2px, transparent 2px), radial-gradient(circle at 75% 75%, #5a8dd4 1px, transparent 1px); background-size: 60px 60px;"></div>
    </div>

    <div class="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div class="w-full max-w-md">

            <!-- Header Section -->
            <div class="text-center mb-8">
                <!-- Logo -->
                <div class="flex items-center justify-center gap-2 mb-6">
                    <div class="w-12 h-12 bg-gradient-to-br from-primary-brand to-primary-brand-dark rounded-xl flex items-center justify-center shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="text-2xl font-bold text-gray-800">Edu</span>
                        <span class="text-2xl font-bold text-primary-brand">Match</span>
                    </div>
                </div>

                <!-- Page Title -->
                <#nested "header" />
            </div>

            <!-- Main Card -->
            <div class="glass-effect rounded-2xl shadow-custom p-8 animate-fadeIn border border-white/20">

                <!-- Messages -->
                <#if displayMessage && message?has_content>
                    <div class="mb-6 p-4 rounded-xl border-l-4 <#if message.type == 'error'>bg-red-50 border-red-400 text-red-700<#elseif message.type == 'success'>bg-green-50 border-green-400 text-green-700<#elseif message.type == 'warning'>bg-yellow-50 border-yellow-400 text-yellow-700<#else>bg-blue-50 border-blue-400 text-blue-700</#if>">
                        <div class="flex items-start gap-3">
                            <#if message.type == 'error'>
                                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                </svg>
                            <#elseif message.type == 'success'>
                                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            <#elseif message.type == 'warning'>
                                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                </svg>
                            <#else>
                                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                </svg>
                            </#if>
                            <div class="text-sm font-medium">${message.summary?no_esc}</div>
                        </div>
                    </div>
                </#if>

                <!-- Form Content -->
                <#nested "form" />
            </div>

            <!-- Footer -->
            <div class="text-center mt-6">
                <p class="text-xs text-gray-500">
                    Secured by EduMatch Authentication System
                </p>
            </div>
        </div>
    </div>

    <!-- JavaScript for enhanced interactions -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Add focus effects to inputs
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.classList.add('input-focus');

                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('ring-2', 'ring-primary-brand/20');
                });

                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('ring-2', 'ring-primary-brand/20');
                });
            });

            // Add hover effects to buttons
            const buttons = document.querySelectorAll('button[type="submit"], .btn');
            buttons.forEach(button => {
                button.classList.add('btn-hover', 'transition-all', 'duration-200');
            });

            // Loading state for forms
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function() {
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.innerHTML = `
                            <svg class="w-4 h-4 animate-spin inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582l12.036-12.036A1.997 1.997 0 0118 6v12a2 2 0 01-2 2H8a2 2 0 01-2-2V8.582L4 4z"/>
                            </svg>
                            Processing...
                        `;
                        submitBtn.disabled = true;
                    }
                });
            });
        });
    </script>
    </body>
    </html>
</#macro>