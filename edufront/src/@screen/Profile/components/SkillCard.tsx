import React from 'react';
import { Edit3 } from 'lucide-react';

interface SkillCardProps {
  skill: {
    [key: string]: any;
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="space-y-1 group cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium text-gray-900 flex-1">{skill.skillName}</div>
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        {skill.proficiencyLevel && (
          <div>
            <span className="font-medium">Level:</span> {skill.proficiencyLevel}
          </div>
        )}
        {skill.yearsExperience > 0 && (
          <div>
            <span className="font-medium">Experience:</span> {skill.yearsExperience} years
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
