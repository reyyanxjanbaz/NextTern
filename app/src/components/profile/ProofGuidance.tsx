import React from 'react';

export const ProofGuidance: React.FC = () => {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="text-xl">💡</span>
        </div>
        <div>
          <h4 className="text-sm font-medium text-indigo-900">Why add proof?</h4>
          <p className="mt-1 text-sm text-indigo-700">
            Recruiters trust skills with evidence 5x more than claims alone.
          </p>
          <div className="mt-3 space-y-2">
            <p className="text-xs font-medium text-indigo-800 uppercase tracking-wide">What counts as proof?</p>
            <ul className="text-sm text-indigo-700 space-y-1 list-disc list-inside">
              <li>Link to a GitHub repository</li>
              <li>Design portfolio or case study</li>
              <li>Live demo or deployed app</li>
              <li>Certification or course completion certificate</li>
              <li>Blog post or article you wrote</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
