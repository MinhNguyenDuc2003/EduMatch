import StatisticCard from './StatisticCard';

interface StatisticItem {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

interface StatisticGridProps {
  stats: StatisticItem[];
}

export default function StatisticGrid({ stats }: StatisticGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatisticCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}
