import React from 'react';
import { AlertCircle } from 'lucide-react';

interface StaleIndicatorProps {
  isStale: boolean;
  daysInState: number;
  threshold: number;
}

export const StaleIndicator: React.FC<StaleIndicatorProps> = ({ isStale, daysInState, threshold }) => {
  if (!isStale) return null;

  return (
    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-100">
      <AlertCircle className="w-3.5 h-3.5" />
      <span>
        No update for {daysInState} days (usually takes {threshold})
      </span>
    </div>
  );
};
