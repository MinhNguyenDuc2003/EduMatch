import { Card, CardContent } from '@/lib/cus/card';
import { useTranslations } from 'next-intl';

interface ConversionFunnelCardProps {
  totalScholarships: number;
  totalViews: number;
  applyRate: number;
  viewButNoApplyRate: number;
}

function ConversionFunnelCard({
  totalScholarships,
  totalViews,
  applyRate,
  viewButNoApplyRate,
}: ConversionFunnelCardProps) {
  const t = useTranslations('providerDashboard.conversionFunnel');
  const viewsCount = totalViews;
  const appliesCount = (applyRate * totalViews) / 100;
  const noApplyCount = totalViews - appliesCount;

  return (
    <Card className="bg-card hover:shadow-md transition-shadow">
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t('scholarships')}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {totalScholarships.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Total Views */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">{t('totalViews')}</p>
              <p className="text-2xl font-bold text-foreground">{viewsCount.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Applied */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {t('appliedApplications')} ({applyRate}%)
              </p>
              <p className="text-2xl font-bold text-green-600">{appliesCount.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${applyRate}%` }}
              />
            </div>
          </div>

          {/* View but No Apply */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {t('viewedButNoApply')} ({viewButNoApplyRate}%)
              </p>
              <p className="text-2xl font-bold text-amber-600">{noApplyCount.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                style={{ width: `${viewButNoApplyRate}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ConversionFunnelCard;
