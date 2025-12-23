import React from 'react';
import { ProfileCard, DurationPreference, HoursPreference } from '@shared/types/profile-card';

interface AvailabilityBlockProps {
  profile: ProfileCard;
  onChange: (updates: Partial<ProfileCard['expanded']['availability']>) => void;
}

export const AvailabilityBlock: React.FC<AvailabilityBlockProps> = ({ profile, onChange }) => {
  const { availability } = profile.expanded;

  const handleChange = (field: keyof typeof availability, value: any) => {
    onChange({ ...availability, [field]: value });
  };

  const handleLocationChange = (value: string) => {
    const locations = value.split(',').map((s) => s.trim()).filter(Boolean);
    handleChange('locationPreferences', locations);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Earliest Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={availability.startDate ? new Date(availability.startDate).toISOString().split('T')[0] : ''}
          onChange={(e) => handleChange('startDate', new Date(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Preferred Duration
        </label>
        <select
          id="duration"
          value={availability.duration}
          onChange={(e) => handleChange('duration', e.target.value as DurationPreference)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="flexible">Flexible</option>
          <option value="1-3-months">1-3 Months</option>
          <option value="3-6-months">3-6 Months</option>
          <option value="6-12-months">6-12 Months</option>
          <option value="12-plus-months">12+ Months</option>
        </select>
      </div>

      <div>
        <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700">
          Hours Per Week
        </label>
        <select
          id="hoursPerWeek"
          value={availability.hoursPerWeek}
          onChange={(e) => handleChange('hoursPerWeek', e.target.value as HoursPreference)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="flexible">Flexible</option>
          <option value="part-time">Part-time (&lt; 20 hrs)</option>
          <option value="full-time">Full-time (40 hrs)</option>
        </select>
      </div>

      <div>
        <label htmlFor="locationPreferences" className="block text-sm font-medium text-gray-700">
          Location Preferences
        </label>
        <p className="text-xs text-gray-500 mb-2">Comma separated (e.g. Remote, New York, London)</p>
        <input
          type="text"
          id="locationPreferences"
          value={availability.locationPreferences.join(', ')}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
