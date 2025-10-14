import React from 'react';

interface SkillCardProps {
  skill: {
    [key: string]: any;
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-900">{skill.skillName}</div>
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
