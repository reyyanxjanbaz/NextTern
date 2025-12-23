import React from 'react';
import { ProfileCard as ProfileCardType } from '../../../../shared/types/profile-card';

interface ComparisonViewProps {
  candidates: ProfileCardType[];
  onClose: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ candidates, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
      <div className="p-4">
        <button onClick={onClose} className="mb-4 text-indigo-600 hover:text-indigo-800">
          &larr; Back to List
        </button>
        <h2 className="text-xl font-bold mb-4">Candidate Comparison</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {candidates.map(candidate => (
            <div key={candidate.id} className="min-w-[300px] bg-white p-4 rounded-lg shadow border border-gray-200">
              <h3 className="font-bold text-lg">{candidate.summary.identity.name}</h3>
              <p className="text-gray-600">{candidate.summary.identity.headline}</p>
              
              <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-500 uppercase">Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.summary.topSkills.map(skill => (
                    <span key={skill.name} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-500 uppercase">Availability</h4>
                <p className="text-sm">{candidate.summary.availabilitySummary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
