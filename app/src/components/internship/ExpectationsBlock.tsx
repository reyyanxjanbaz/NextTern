import React from 'react';
import { PracticalExpectations } from '../../../../shared/types/internship-card';
import { Plus, Trash2 } from 'lucide-react';

interface ExpectationsBlockProps {
  data: PracticalExpectations;
  onChange: (data: PracticalExpectations) => void;
}

export default function ExpectationsBlock({ data, onChange }: ExpectationsBlockProps) {
  const handleChange = (field: keyof PracticalExpectations, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleRequiredSkillChange = (index: number, field: 'skill' | 'level', value: string) => {
    const newSkills = [...data.requiredSkills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    handleChange('requiredSkills', newSkills);
  };

  const addRequiredSkill = () => {
    handleChange('requiredSkills', [...data.requiredSkills, { skill: '', level: 'familiar' }]);
  };

  const removeRequiredSkill = (index: number) => {
    const newSkills = [...data.requiredSkills];
    newSkills.splice(index, 1);
    handleChange('requiredSkills', newSkills);
  };

  const handleArrayChange = (field: 'preferredSkills' | 'otherRequirements', index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    handleChange(field, newArray);
  };

  const addArrayItem = (field: 'preferredSkills' | 'otherRequirements') => {
    handleChange(field, [...data[field], '']);
  };

  const removeArrayItem = (field: 'preferredSkills' | 'otherRequirements', index: number) => {
    const newArray = [...data[field]];
    newArray.splice(index, 1);
    handleChange(field, newArray);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Practical Expectations</h3>
        <p className="text-sm text-gray-500">Be realistic about requirements. No hidden criteria.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <div className="mt-2 space-y-2">
            {data.requiredSkills.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={item.skill}
                  onChange={(e) => handleRequiredSkillChange(index, 'skill', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Skill name"
                />
                <select
                  value={item.level}
                  onChange={(e) => handleRequiredSkillChange(index, 'level', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-32 sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="familiar">Familiar</option>
                  <option value="comfortable">Comfortable</option>
                  <option value="proficient">Proficient</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeRequiredSkill(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequiredSkill}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Required Skill
            </button>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Nice-to-Have Skills</label>
          <div className="mt-2 space-y-2">
            {data.preferredSkills.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('preferredSkills', index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Skill name"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('preferredSkills', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('preferredSkills')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Preferred Skill
            </button>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Education Requirements</label>
          <div className="mt-1 flex gap-4">
            <select
              value={data.education?.level || 'any'}
              onChange={(e) => handleChange('education', { ...data.education, level: e.target.value })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="any">No degree required</option>
              <option value="pursuing-degree">Currently pursuing degree</option>
              <option value="degree-required">Degree required</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Other Requirements</label>
          <div className="mt-2 space-y-2">
            {data.otherRequirements.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('otherRequirements', index, e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Must be available for 12 weeks"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('otherRequirements', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('otherRequirements')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Requirement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
