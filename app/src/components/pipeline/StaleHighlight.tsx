import React from 'react';
import { differenceInDays } from 'date-fns';

interface StaleHighlightProps {
  updatedAt: string | Date;
  thresholdDays?: number;
}

export const StaleHighlight: React.FC<StaleHighlightProps> = ({ 
  updatedAt, 
  thresholdDays = 5 
}) => {
  const daysStale = differenceInDays(new Date(), new Date(updatedAt));

  if (daysStale < thresholdDays) return null;

  return (
    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" title={`Stale: ${daysStale} days in this stage`} />
  );
};
