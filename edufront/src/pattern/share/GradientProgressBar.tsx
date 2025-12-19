interface GradientProgressBarProps {
  label: string;
  percentage: number;
  segments?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  customColor?: string; // For single color bars like demand score
}

export default function GradientProgressBar({
  label,
  percentage,
  segments = 20,
  orientation = 'horizontal',
  className = '',
  customColor,
}: GradientProgressBarProps) {
  const filledSegments = Math.round((percentage / 100) * segments);

  // Simple gradient colors from blue to pink
  const getSegmentColor = (index: number) => {
    if (customColor) return customColor;

    const progress = index / segments;
    // Blue (220) -> Purple (280) -> Pink (320)
    const hue = 220 + progress * 100;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const segmentArray = Array.from({ length: segments }, (_, i) => ({
    filled: i < filledSegments,
    color: i < filledSegments ? getSegmentColor(i) : '#e5e7eb',
  }));

  if (orientation === 'vertical') {
    // Vertical bar for job matches
    return (
      <div className={`flex gap-1 ${className}`}>
        {segmentArray.map((segment, i) => (
          <div key={i} className="h-2 w-1 rounded-sm" style={{ backgroundColor: segment.color }} />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{percentage}%</span>
      </div>
      <div className="flex gap-1">
        {segmentArray.map((segment, i) => (
          <div
            key={i}
            className="h-2 flex-1 rounded-sm"
            style={{ backgroundColor: segment.color }}
          />
        ))}
      </div>
    </div>
  );
}
