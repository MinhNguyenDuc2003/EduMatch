import { Card, CardContent } from '@/pattern/cus/card';
import { useTranslations } from 'next-intl';

interface DecisionStatusCardProps {
  totalApplies: number;
  approveRate: number;
  rejectRate: number;
  pendingRate: number;
}

function DecisionStatusCard({
  totalApplies,
  approveRate,
  rejectRate,
  pendingRate,
}: DecisionStatusCardProps) {
  const t = useTranslations('providerDashboard.decisionStatus');
  const approveCount = Math.round((totalApplies * approveRate) / 100);
  const rejectCount = Math.round((totalApplies * rejectRate) / 100);
  const pendingCount = Math.round((totalApplies * pendingRate) / 100);

  return (
    <Card className="bg-card hover:shadow-md transition-shadow">
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t('applicationDecisions')}
            </p>
            <p className="text-2xl font-bold text-foreground">{totalApplies.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Approved */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {t('approved')} ({approveRate.toFixed(2)}%)
              </p>
              <p className="text-lg font-semibold text-green-600">
                {approveCount.toLocaleString()}
              </p>
            </div>
            <div className="bg-muted rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: `${approveRate.toFixed(2)}%` }}
              />
            </div>
          </div>

          {/* Rejected */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {t('rejected')} ({rejectRate.toFixed(2)}%)
              </p>
              <p className="text-lg font-semibold text-red-600">{rejectCount.toLocaleString()}</p>
            </div>
            <div className="bg-muted rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: `${rejectRate.toFixed(2)}%` }}
              />
            </div>
          </div>

          {/* Pending */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {t('pending')} ({pendingRate}%)
              </p>
              <p className="text-lg font-semibold text-amber-600">
                {pendingCount.toLocaleString()}
              </p>
            </div>
            <div className="bg-muted rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${pendingRate}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DecisionStatusCard;
