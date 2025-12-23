import React from 'react';
import { Compensation, InternshipDuration } from '../../../../shared/types/internship-card';
import { Plus, Trash2 } from 'lucide-react';

interface CompensationBlockProps {
  compensation: Compensation;
  duration: InternshipDuration;
  onCompensationChange: (data: Compensation) => void;
  onDurationChange: (data: InternshipDuration) => void;
}

export default function CompensationBlock({
  compensation,
  duration,
  onCompensationChange,
  onDurationChange,
}: CompensationBlockProps) {
  const handleCompensationChange = (field: keyof Compensation, value: any) => {
    onCompensationChange({ ...compensation, [field]: value });
  };

  const handleDurationChange = (field: keyof InternshipDuration, value: any) => {
    onDurationChange({ ...duration, [field]: value });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...compensation.benefits];
    newBenefits[index] = value;
    handleCompensationChange('benefits', newBenefits);
  };

  const addBenefit = () => {
    handleCompensationChange('benefits', [...compensation.benefits, '']);
  };

  const removeBenefit = (index: number) => {
    const newBenefits = [...compensation.benefits];
    newBenefits.splice(index, 1);
    handleCompensationChange('benefits', newBenefits);
  };

  return (
    <div className="space-y-8">
      {/* Duration Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Duration & Timing</h3>
          <p className="text-sm text-gray-500">When and where will this happen?</p>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="arrangement" className="block text-sm font-medium text-gray-700">
              Work Arrangement
            </label>
            <div className="mt-1">
              <select
                id="arrangement"
                name="arrangement"
                value={duration.arrangement}
                onChange={(e) => handleDurationChange('arrangement', e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>

          {duration.arrangement !== 'remote' && (
            <div className="sm:col-span-3">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={duration.location || ''}
                  onChange={(e) => handleDurationChange('location', e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. New York, NY"
                />
              </div>
            </div>
          )}

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Length (Weeks)</label>
            <div className="mt-1 flex gap-2 items-center">
              <input
                type="number"
                value={duration.length.min}
                onChange={(e) => handleDurationChange('length', { ...duration.length, min: parseInt(e.target.value) })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-20 sm:text-sm border-gray-300 rounded-md"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={duration.length.max}
                onChange={(e) => handleDurationChange('length', { ...duration.length, max: parseInt(e.target.value) })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-20 sm:text-sm border-gray-300 rounded-md"
              />
              <span className="text-gray-500">weeks</span>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Hours per Week</label>
            <div className="mt-1 flex gap-2 items-center">
              <input
                type="number"
                value={duration.hoursPerWeek.min}
                onChange={(e) => handleDurationChange('hoursPerWeek', { ...duration.hoursPerWeek, min: parseInt(e.target.value) })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-20 sm:text-sm border-gray-300 rounded-md"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={duration.hoursPerWeek.max}
                onChange={(e) => handleDurationChange('hoursPerWeek', { ...duration.hoursPerWeek, max: parseInt(e.target.value) })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-20 sm:text-sm border-gray-300 rounded-md"
              />
              <span className="text-gray-500">hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compensation Section */}
      <div className="space-y-6 pt-6 border-t border-gray-200">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Compensation</h3>
          <p className="text-sm text-gray-500">Transparency builds trust.</p>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <div className="mt-1">
              <select
                id="type"
                name="type"
                value={compensation.type}
                onChange={(e) => handleCompensationChange('type', e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="paid">Paid</option>
                <option value="stipend">Stipend</option>
                <option value="unpaid">Unpaid</option>
                <option value="academic-credit">Academic Credit</option>
              </select>
            </div>
          </div>

          {(compensation.type === 'paid' || compensation.type === 'stipend') && (
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="number"
                  value={compensation.amount?.value || 0}
                  onChange={(e) => handleCompensationChange('amount', { ...compensation.amount, value: parseInt(e.target.value) })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Amount"
                />
                <select
                  value={compensation.amount?.currency || 'USD'}
                  onChange={(e) => handleCompensationChange('amount', { ...compensation.amount, currency: e.target.value })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <select
                  value={compensation.amount?.period || 'hourly'}
                  onChange={(e) => handleCompensationChange('amount', { ...compensation.amount, period: e.target.value })}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-32 sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="hourly">/ hour</option>
                  <option value="weekly">/ week</option>
                  <option value="monthly">/ month</option>
                  <option value="total">total</option>
                </select>
              </div>
            </div>
          )}

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Benefits</label>
            <div className="mt-2 space-y-2">
              {compensation.benefits.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. Remote work stipend, Mentorship"
                  />
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Benefit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
