import StatisticCard from "./StatisticCard";

interface StatisticItem {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  filterName?: string;
  color?: string;
}

interface StatisticGridProps {
  stats: StatisticItem[];
  onFilterSelect?: (filterKey: string) => void;
}

export default function StatisticGrid({ stats, onFilterSelect }: StatisticGridProps) {
  
  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatisticCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          onClick={() => onFilterSelect?.(stat.filterName || "")} 
        />
      ))}
    </div>
  );
}
