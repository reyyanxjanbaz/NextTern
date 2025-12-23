import React from 'react';
import { NextOutcome } from '../../../../shared/types/status-card';
import { ArrowRight } from 'lucide-react';

interface NextOutcomesProps {
  outcomes: NextOutcome[];
}

export const NextOutcomes: React.FC<NextOutcomesProps> = ({ outcomes }) => {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Possible Next Steps
      </h4>
      <div className="space-y-2">
        {outcomes.map((outcome, index) => (
          <div 
            key={index} 
            className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex-shrink-0 mt-0.5">
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {outcome.description}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {outcome.triggeredBy === 'student' 
                  ? 'You can trigger this' 
                  : outcome.triggeredBy === 'recruiter' 
                    ? 'Waiting for recruiter' 
                    : 'Either party can trigger'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
