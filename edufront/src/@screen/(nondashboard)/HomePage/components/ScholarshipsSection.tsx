import { useRouter } from 'next/navigation';
import { Button } from '@/lib/cus/button';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { ArrowRight } from 'lucide-react';
import { compact, map } from 'lodash';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {map(scholarships?.slice(0, 4), (item) => {
            // Parse fundingAmount to number for display
            const amountNumber = item.fundingAmount
              ? parseFloat(item.fundingAmount.replace(/[^0-9.]/g, ''))
              : 0;
            // Format endDate timestamp to ISO string
            const endDateISO = item.endDate
              ? new Date(item.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '';

            return (
              <CardSmalPic
                key={item.id}
                title={item.title}
                amount={amountNumber}
                deadline={endDateISO}
                description={item.shortDescription}
                tagName={compact([item?.country, item?.university, item?.studyLevel])}
                titleButton="Apply Now"
                onViewDetails={() => onViewDetails(item)}
                university={item.university}
                study_level={item.studyLevel}
                scholarship_type={item.scholarshipType}
                gpa_requirement={item.gpaRequirement}
                country={item.country}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
