import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SilenceAlertProps {
  staleCount: number;
}

export const SilenceAlert: React.FC<SilenceAlertProps> = ({ staleCount }) => {
  if (staleCount === 0) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700">
            <span className="font-medium">Silence Detected:</span> {staleCount} application{staleCount > 1 ? 's' : ''} haven't had updates in a while.
          </p>
          <p className="text-xs text-amber-600 mt-1">
            We surface this so you aren't left wondering. You can withdraw if you've moved on.
          </p>
        </div>
      </div>
    </div>
  );
};
