import { Button } from '@/lib/cus/button';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { ArrowRight } from 'lucide-react';
import { compact, map } from 'lodash';

type ScholarshipItem = {
  Id?: number;
  Title?: string;
  Funding_amount?: number;
  End_date?: string;
  Short_description?: string;
  Country?: string;
  University?: string;
  Study_level?: string;
  Scholarship_type?: string;
  Gpa_requirement?: number;
  Provider_id?: number;
  Slug?: string;
  Description?: string;
  Requirements?: string;
  Benefits?: string;
  Fields?: string;
  Start_date?: string;
  Available_slots?: number;
  Language_requirement?: string;
};

type ScholarshipsSectionProps = {
  scholarships: ScholarshipItem[];
  onApply: (item: ScholarshipItem) => void;
  onViewDetails: (item: ScholarshipItem) => void;
};

export default function ScholarshipsSection({
  scholarships,
  onApply,
  onViewDetails,
}: ScholarshipsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
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
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {map(scholarships?.slice(0, 4), (item) => (
            <CardSmalPic
              key={item.Id}
              title={item.Title}
              amount={item?.Funding_amount ?? 0}
              deadline={item.End_date}
              description={item.Short_description}
              tagName={compact([item?.Country, item?.University, item?.Study_level])}
              titleButton="Apply Now"
              onClick={() => onApply(item)}
              onViewDetails={() => onViewDetails(item)}
              university={item.University}
              study_level={item.Study_level}
              scholarship_type={item.Scholarship_type}
              gpa_requirement={item.Gpa_requirement}
              country={item.Country}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
