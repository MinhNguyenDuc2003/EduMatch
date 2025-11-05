import { useRouter } from 'next/navigation';
import { Button } from '@/lib/cus/button';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { ArrowRight } from 'lucide-react';
import { map } from 'lodash';

type ScholarshipsSectionProps = {
  scholarships: Scholarship[];
  onViewDetails: (item: Scholarship) => void;
};

export default function ScholarshipsSection({
  scholarships,
  onViewDetails,
}: ScholarshipsSectionProps) {
  const router = useRouter();

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Featured Scholarships</h2>
            <p className="text-xl text-slate-600">
              Explore our latest and most popular opportunities
            </p>
          </div>
          <Button
            variant="outline"
            className="px-6 py-3 rounded-xl border-2 border-slate-300 text-primary hover:border-blue-600 hover:text-blue-600 transition-all"
            value="View All"
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={() => router.push('/scholarships')}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {map(scholarships?.slice(0, 3), (item) => (
            <CardSmalPic
              key={item.id}
              picture={item.organizationLogoUrl}
              title={item.title}
              amount={item.fundingAmount}
              deadline={item.endDate}
              description={item.shortDescription}
              university={item.university}
              onViewDetails={() => onViewDetails(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
