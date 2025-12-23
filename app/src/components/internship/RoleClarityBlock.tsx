import React from 'react';
import { RoleClarity } from '../../../../shared/types/internship-card';
import { Plus, Trash2 } from 'lucide-react';

interface RoleClarityBlockProps {
  data: RoleClarity;
  onChange: (data: RoleClarity) => void;
}

export default function RoleClarityBlock({ data, onChange }: RoleClarityBlockProps) {
  const handleChange = (field: keyof RoleClarity, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleArrayChange = (field: 'responsibilities' | 'collaboration', index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    handleChange(field, newArray);
  };

  const addArrayItem = (field: 'responsibilities' | 'collaboration') => {
    handleChange(field, [...data[field], '']);
  };

  const removeArrayItem = (field: 'responsibilities' | 'collaboration', index: number) => {
    const newArray = [...data[field]];
    newArray.splice(index, 1);
    handleChange(field, newArray);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Role Clarity</h3>
        <p className="text-sm text-gray-500">Define the "why" of this role.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Role Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="team" className="block text-sm font-medium text-gray-700">
            Team / Department
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="team"
              id="team"
              value={data.team}
              onChange={(e) => handleChange('team', e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
            Purpose (Why does this role exist?)
          </label>
          <div className="mt-1">
            <textarea
              id="purpose"
              name="purpose"
              rows={3}
              value={data.purpose}
              onChange={(e) => handleChange('purpose', e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Key Responsibilities</label>
          <div className="mt-2 space-y-2">
            {data.responsibilities.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Build React components"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('responsibilities', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('responsibilities')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Responsibility
            </button>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Collaboration (Who you'll work with)</label>
          <div className="mt-2 space-y-2">
            {data.collaboration.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('collaboration', index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Product Managers, Designers"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('collaboration', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('collaboration')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Collaborator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
