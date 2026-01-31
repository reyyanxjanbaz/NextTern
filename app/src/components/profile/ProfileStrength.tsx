import React from 'react';
import { ProfileCard } from '@shared/types/profile-card';

interface ProfileStrengthProps {
  profile: ProfileCard;
}

export const ProfileStrength: React.FC<ProfileStrengthProps> = ({ profile }) => {
  const calculateStrength = () => {
    let score = 0;
    const suggestions: string[] = [];

    // Identity (20%)
    if (profile.expanded.identity.name) score += 5;
    if (profile.expanded.identity.headline) score += 5;
    if (profile.expanded.identity.photoUrl) score += 5;
    if (profile.expanded.identity.education) score += 5;
    else suggestions.push('Add education details');

    // Intent (20%)
    if (profile.expanded.roleIntent.roleTypes.length > 0) score += 10;
    else suggestions.push('Specify desired roles');
    if (profile.expanded.roleIntent.statement) score += 10;

    // Availability (10%)
    if (profile.expanded.availability.startDate) score += 10;

    // Skills (30%)
    const skillsCount = profile.expanded.skills.length;
    if (skillsCount > 0) score += 10;
    if (skillsCount >= 3) score += 10;
    else suggestions.push('Add at least 3 skills');
    
    const skillsWithProof = profile.expanded.skills.filter(s => s.hasProof).length;
    if (skillsWithProof > 0) score += 10;
    else suggestions.push('Add proof to at least one skill');

    // Projects (20%)
    if (profile.expanded.projectIds.length > 0) score += 20;
    else suggestions.push('Add a project to showcase your work');

    return { score, suggestions };
  };

  const { score, suggestions } = calculateStrength();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900">Profile Strength</h4>
        <span className="text-sm font-bold text-indigo-600">{score}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className={`h-2.5 rounded-full ${
            score < 40 ? 'bg-red-500' : score < 70 ? 'bg-yellow-500' : 'bg-green-500'
          }`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>

      {suggestions.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Suggestions to improve:</p>
          <ul className="space-y-1">
            {suggestions.slice(0, 3).map((suggestion, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                <span className="text-indigo-500">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
