import React, { useState } from 'react';
import { RecruiterSwipeMode } from '../../components/discovery/RecruiterSwipeMode';
import { ReviewMode } from '../../components/discovery/ReviewMode';

type DiscoveryMode = 'swipe' | 'review';

export const CandidateDiscovery: React.FC = () => {
  const [mode, setMode] = useState<DiscoveryMode>('swipe');

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Candidate Discovery</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('swipe')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'swipe'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Swipe Mode
          </button>
          <button
            onClick={() => setMode('review')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'review'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Review Mode
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {mode === 'swipe' ? <RecruiterSwipeMode /> : <ReviewMode />}
      </div>
    </div>
  );
};
