import React from 'react';
import { Check, AlertCircle, Clock, Zap } from 'lucide-react';

interface AlignmentFactorsProps {
  factors: {
    skills: {
      score: number;
      matches: string[];
      missingCount: number;
    };
    availability: {
      score: number;
      isAligned: boolean;
      issues: string[];
    };
    behavior: {
      studentReliability: number;
      recruiterReliability: number;
    };
  };
}

export const AlignmentFactors: React.FC<AlignmentFactorsProps> = ({ factors }) => {
  return (
    <div className="space-y-4">
      {/* Skills */}
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${factors.skills.score > 70 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">Skills Alignment</h4>
          <p className="text-xs text-gray-500 mt-1">
            {factors.skills.matches.length > 0 
              ? `Matches: ${factors.skills.matches.join(', ')}`
              : 'No direct skill matches found yet.'}
          </p>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${factors.availability.isAligned ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">Timing & Availability</h4>
          {factors.availability.issues.length > 0 ? (
            <ul className="text-xs text-red-600 mt-1 list-disc list-inside">
              {factors.availability.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Your schedule fits their requirements.</p>
          )}
        </div>
      </div>

      {/* Reliability */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
          <Check className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">Responsiveness</h4>
          <p className="text-xs text-gray-500 mt-1">
            Recruiter replies to {factors.behavior.recruiterReliability}% of applications.
          </p>
        </div>
      </div>
    </div>
  );
};
