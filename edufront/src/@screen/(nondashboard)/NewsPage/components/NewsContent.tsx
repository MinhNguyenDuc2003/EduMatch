type NewsContentProps = {
  news: News;
};

export default function NewsContent({ news }: NewsContentProps) {
  return (
    <>
      {/* Content Section */}
      <section className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Content</h2>
        <div
          className="text-gray-700 leading-relaxed text-sm prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </section>

      {/* Read More Link */}
      {news.link && (
        <section className="mb-4">
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <span>Read full article</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </section>
      )}
    </>
  );
}
