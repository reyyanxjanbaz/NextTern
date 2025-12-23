import React from 'react';
import { differenceInDays } from 'date-fns';

interface SilenceIndicatorProps {
  lastActivity: string | Date;
  thresholdDays?: number;
}

export const SilenceIndicator: React.FC<SilenceIndicatorProps> = ({ 
  lastActivity, 
  thresholdDays = 3 
}) => {
  const daysSilent = differenceInDays(new Date(), new Date(lastActivity));

  if (daysSilent < thresholdDays) return null;

  return (
    <div className="flex items-center text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
      <span>{daysSilent} days since last reply</span>
    </div>
  );
};
