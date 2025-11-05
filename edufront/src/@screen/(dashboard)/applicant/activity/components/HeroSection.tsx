'use client';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">
      {/* Content */}
      <div className="relative mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center sm:px-10 lg:min-h-[450px] lg:px-40 lg:py-24">
        <div className="w-full">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm">
            <span className="text-sm font-medium text-blue-900">My Activity</span>
          </div>

          <h1 className="mt-4 text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Manage Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Scholarship Activities
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Track your shortlisted scholarships, monitor your applications, and stay connected with
            scholarship providers you follow.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 px-6 py-2.5 shadow-sm">
              <span className="text-gray-700 font-medium">Updated in real-time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
