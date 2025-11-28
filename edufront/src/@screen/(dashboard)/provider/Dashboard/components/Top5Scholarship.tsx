import { Card, CardContent, CardHeader, CardTitle } from '@/lib/cus/card';
import React from 'react';
import { useTranslations } from 'next-intl';

interface Top5ScholarshipProps {
  top5ByView: string[];
  top5ByApply: string[];
}

const Top5Scholarship = ({ top5ByView, top5ByApply }: Top5ScholarshipProps) => {
  const t = useTranslations('providerDashboard.top5Scholarship');
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('top5ByViews')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {top5ByView.map((scholarship, idx) => (
              <li key={idx} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground break-words">{scholarship}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('top5ByApplications')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {top5ByApply.map((scholarship, idx) => (
              <li key={idx} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground break-words">{scholarship}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Top5Scholarship;
