import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { NewsItem } from '../mockData';
import { Calendar, ArrowRight } from 'lucide-react';

type NewsDetailProps = {
  news: NewsItem;
};

export default function NewsDetail({ news }: NewsDetailProps) {
  const router = useRouter();

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
      {/* Image Section */}
      <div className="relative w-full h-96 overflow-hidden">
        <Image
          src={news.imgUrl}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">{news.title}</h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10">
        {/* Article Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Published recently</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-slate max-w-none mb-8">
          <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
            {news.content}
          </p>
        </div>

        {/* Read More Link */}
        <Link
          href={news.link}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
        >
          <span>Read full article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Scholarship Card Section */}
        {news.scholarship && (
          <div className="mt-12 pt-12 border-t border-slate-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Related Scholarship</h3>
              <p className="text-slate-600">
                Check out this scholarship opportunity related to this article
              </p>
            </div>
            <div className="max-w-md">
              <CardSmalPic
                scholarship={news.scholarship}
                onViewDetails={() => router.push(`/scholarships/${news.scholarship!.slug}`)}
                onToggleTracking={(id) => {
                  // Handle tracking logic here
                  console.log('Toggle tracking:', id);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

