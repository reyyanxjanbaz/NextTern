import React from 'react';

interface SwipeLimitIndicatorProps {
  remaining: number;
  limit: number;
}

export default function SwipeLimitIndicator({ remaining, limit }: SwipeLimitIndicatorProps) {
  const percentage = (remaining / limit) * 100;
  const isLow = percentage < 20;

  return (
    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200 flex items-center gap-2">
      <div className="relative w-6 h-6 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 10}
            strokeDashoffset={2 * Math.PI * 10 * (1 - percentage / 100)}
            className={isLow ? 'text-red-500' : 'text-indigo-600'}
          />
        </svg>
        <span className={`text-xs font-bold absolute ${isLow ? 'text-red-600' : 'text-gray-700'}`}>
          {remaining}
        </span>
      </div>
      <span className="text-xs font-medium text-gray-600">swipes left</span>
    </div>
  );
}
