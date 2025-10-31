import React from 'react';

interface PreferenceCardProps {
  preference: any;
}

const PreferenceCard: React.FC<PreferenceCardProps> = ({ preference }) => {
  // Calculate weight percentage (assuming weight is 0-10 scale)
  const weightPercentage = (preference.weight / 10) * 100;

  // Color based on weight
  const getWeightColor = (weight: number) => {
    if (weight >= 8) return 'text-green-600 bg-green-50';
    if (weight >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="border-l-4 border-primary-brand pl-4 py-2 space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-900">{preference.type}</h4>
            <span
              className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${getWeightColor(preference.weight)}`}
            >
              Weight: {preference.weight}/10
            </span>
          </div>
          <p className="text-sm text-gray-700 mt-1">{preference.value}</p>
        </div>
      </div>

      {/* Weight Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-primary-brand h-1.5 rounded-full transition-all"
          style={{ width: `${weightPercentage}%` }}
        />
      </div>

      {/* Note */}
      {preference.note && (
        <p className="text-xs text-gray-600 italic mt-1 bg-gray-50 p-2 rounded">
          {preference.note}
        </p>
      )}
    </div>
  );
};

export default PreferenceCard;
