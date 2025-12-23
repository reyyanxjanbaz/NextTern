import React from 'react';
import { ProfileCard } from '@shared/types/profile-card';

interface IdentityBlockProps {
  profile: ProfileCard;
  onChange: (updates: Partial<ProfileCard['expanded']['identity']>) => void;
}

export const IdentityBlock: React.FC<IdentityBlockProps> = ({ profile, onChange }) => {
  const { identity } = profile.expanded;

  const handleChange = (field: keyof typeof identity, value: any) => {
    onChange({ ...identity, [field]: value });
  };

  const handleEducationChange = (field: string, value: string) => {
    const education = { ...identity.education, [field]: value } as any;
    onChange({ ...identity, education });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={identity.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
          Professional Headline
        </label>
        <input
          type="text"
          id="headline"
          value={identity.headline}
          onChange={(e) => handleChange('headline', e.target.value)}
          placeholder="e.g. CS Student at Stanford | Full Stack Developer"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
          Photo URL
        </label>
        <input
          type="text"
          id="photoUrl"
          value={identity.photoUrl || ''}
          onChange={(e) => handleChange('photoUrl', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={identity.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, Country"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Education</h4>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
              Institution
            </label>
            <input
              type="text"
              id="institution"
              value={identity.education?.institution || ''}
              onChange={(e) => handleEducationChange('institution', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              value={identity.education?.degree || ''}
              onChange={(e) => handleEducationChange('degree', e.target.value)}
              placeholder="e.g. BS"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="field" className="block text-sm font-medium text-gray-700">
              Field of Study
            </label>
            <input
              type="text"
              id="field"
              value={identity.education?.field || ''}
              onChange={(e) => handleEducationChange('field', e.target.value)}
              placeholder="e.g. Computer Science"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
              Graduation Year
            </label>
            <input
              type="number"
              id="graduationYear"
              value={identity.education?.graduationYear || ''}
              onChange={(e) => handleEducationChange('graduationYear', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
