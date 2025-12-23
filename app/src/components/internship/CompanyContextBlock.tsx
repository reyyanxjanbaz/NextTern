import React from 'react';
import { CompanyContext, CompanySize, CompanyStage } from '../../../../shared/types/internship-card';
import { Plus, Trash2 } from 'lucide-react';

interface CompanyContextBlockProps {
  data: CompanyContext;
  onChange: (data: CompanyContext) => void;
}

export default function CompanyContextBlock({ data, onChange }: CompanyContextBlockProps) {
  const handleChange = (field: keyof CompanyContext, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleLocationChange = (index: number, value: string) => {
    const newLocations = [...data.locations];
    newLocations[index] = value;
    handleChange('locations', newLocations);
  };

  const addLocation = () => {
    handleChange('locations', [...data.locations, '']);
  };

  const removeLocation = (index: number) => {
    const newLocations = [...data.locations];
    newLocations.splice(index, 1);
    handleChange('locations', newLocations);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Company Context</h3>
        <p className="text-sm text-gray-500">Tell candidates about your organization.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="industry"
              id="industry"
              value={data.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Brief Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={3}
              value={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            Company Size
          </label>
          <div className="mt-1">
            <select
              id="size"
              name="size"
              value={data.size}
              onChange={(e) => handleChange('size', e.target.value as CompanySize)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="startup">Startup (1-10)</option>
              <option value="small">Small (11-50)</option>
              <option value="medium">Medium (51-200)</option>
              <option value="large">Large (201-1000)</option>
              <option value="enterprise">Enterprise (1000+)</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
            Company Stage
          </label>
          <div className="mt-1">
            <select
              id="stage"
              name="stage"
              value={data.stage}
              onChange={(e) => handleChange('stage', e.target.value as CompanyStage)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="early-stage">Early Stage</option>
              <option value="growth">Growth</option>
              <option value="established">Established</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <div className="mt-1">
            <input
              type="url"
              name="website"
              id="website"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Locations</label>
          <div className="mt-2 space-y-2">
            {data.locations.map((location, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => handleLocationChange(index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. San Francisco, CA"
                />
                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLocation}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
