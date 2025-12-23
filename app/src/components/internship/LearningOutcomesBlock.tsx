import React from 'react';
import { LearningOutcomes } from '../../../../shared/types/internship-card';
import { Plus, Trash2 } from 'lucide-react';

interface LearningOutcomesBlockProps {
  data: LearningOutcomes;
  onChange: (data: LearningOutcomes) => void;
}

export default function LearningOutcomesBlock({ data, onChange }: LearningOutcomesBlockProps) {
  const handleChange = (field: keyof LearningOutcomes, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleArrayChange = (field: 'skills' | 'projectTypes' | 'growthOpportunities', index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    handleChange(field, newArray);
  };

  const addArrayItem = (field: 'skills' | 'projectTypes' | 'growthOpportunities') => {
    handleChange(field, [...data[field], '']);
  };

  const removeArrayItem = (field: 'skills' | 'projectTypes' | 'growthOpportunities', index: number) => {
    const newArray = [...data[field]];
    newArray.splice(index, 1);
    handleChange(field, newArray);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Learning Outcomes</h3>
        <p className="text-sm text-gray-500">What will the intern gain from this experience?</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Skills They Will Develop</label>
          <div className="mt-2 space-y-2">
            {data.skills.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. React, TypeScript, Team Collaboration"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('skills', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('skills')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Skill
            </button>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Project Types</label>
          <div className="mt-2 space-y-2">
            {data.projectTypes.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('projectTypes', index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Feature development, Bug fixes, Research"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('projectTypes', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('projectTypes')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Project Type
            </button>
          </div>
        </div>

        <div className="sm:col-span-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="mentorship"
                name="mentorship"
                type="checkbox"
                checked={data.mentorship.available}
                onChange={(e) => handleChange('mentorship', { ...data.mentorship, available: e.target.checked })}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="mentorship" className="font-medium text-gray-700">Mentorship Available</label>
              <p className="text-gray-500">Will the intern have a dedicated mentor?</p>
            </div>
          </div>
          {data.mentorship.available && (
            <div className="mt-2 ml-7">
              <label htmlFor="mentorshipDescription" className="block text-sm font-medium text-gray-700">
                Mentorship Details
              </label>
              <div className="mt-1">
                <textarea
                  id="mentorshipDescription"
                  name="mentorshipDescription"
                  rows={2}
                  value={data.mentorship.description || ''}
                  onChange={(e) => handleChange('mentorship', { ...data.mentorship, description: e.target.value })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Describe the mentorship structure..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Growth Opportunities</label>
          <div className="mt-2 space-y-2">
            {data.growthOpportunities.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('growthOpportunities', index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Full-time offer potential, Networking events"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('growthOpportunities', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('growthOpportunities')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Opportunity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
