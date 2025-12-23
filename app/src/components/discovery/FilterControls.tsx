import React from 'react';

interface FilterControlsProps {
  onFilterChange: (filters: any) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 border-b border-gray-200 flex gap-4 overflow-x-auto">
      <select 
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={(e) => onFilterChange({ role: e.target.value })}
      >
        <option value="">All Roles</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="design">Design</option>
      </select>

      <select 
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={(e) => onFilterChange({ availability: e.target.value })}
      >
        <option value="">Any Availability</option>
        <option value="immediate">Immediate</option>
        <option value="1-month">In 1 Month</option>
      </select>
      
      {/* Add more filters as needed */}
    </div>
  );
};
