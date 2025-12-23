import React from 'react';
import { ProfileCard } from '@shared/types/profile-card';

interface RoleIntentBlockProps {
  profile: ProfileCard;
  onChange: (updates: Partial<ProfileCard['expanded']['roleIntent']>) => void;
}

export const RoleIntentBlock: React.FC<RoleIntentBlockProps> = ({ profile, onChange }) => {
  const { roleIntent } = profile.expanded;

  const handleChange = (field: keyof typeof roleIntent, value: any) => {
    onChange({ ...roleIntent, [field]: value });
  };

  const handleArrayChange = (field: 'roleTypes' | 'industries' | 'learningGoals', value: string) => {
    // Simple comma-separated input for now
    const array = value.split(',').map((s) => s.trim()).filter(Boolean);
    handleChange(field, array);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="statement" className="block text-sm font-medium text-gray-700">
          Personal Statement
        </label>
        <p className="text-xs text-gray-500 mb-2">Briefly describe what you are looking for and why.</p>
        <textarea
          id="statement"
          rows={3}
          value={roleIntent.statement || ''}
          onChange={(e) => handleChange('statement', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="roleTypes" className="block text-sm font-medium text-gray-700">
          Desired Roles
        </label>
        <p className="text-xs text-gray-500 mb-2">Comma separated (e.g. Frontend Developer, Product Designer)</p>
        <input
          type="text"
          id="roleTypes"
          value={roleIntent.roleTypes.join(', ')}
          onChange={(e) => handleArrayChange('roleTypes', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="industries" className="block text-sm font-medium text-gray-700">
          Preferred Industries
        </label>
        <p className="text-xs text-gray-500 mb-2">Comma separated (e.g. Fintech, Edtech, Health)</p>
        <input
          type="text"
          id="industries"
          value={roleIntent.industries.join(', ')}
          onChange={(e) => handleArrayChange('industries', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="learningGoals" className="block text-sm font-medium text-gray-700">
          Learning Goals
        </label>
        <p className="text-xs text-gray-500 mb-2">What do you want to learn? Comma separated.</p>
        <textarea
          id="learningGoals"
          rows={3}
          value={roleIntent.learningGoals.join(', ')}
          onChange={(e) => handleArrayChange('learningGoals', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
