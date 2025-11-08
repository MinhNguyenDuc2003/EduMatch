'use client';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">
      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-5 text-center sm:px-10 lg:px-40 lg:py-10">
        <div className="w-full">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Manage Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Scholarship Activities
              </span>
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base text-gray-600 leading-relaxed pb-15">
            Track your shortlisted scholarships, monitor your applications, and stay connected with
            scholarship providers you follow.
          </p>
        </div>
      </div>
    </section>
  );
}
