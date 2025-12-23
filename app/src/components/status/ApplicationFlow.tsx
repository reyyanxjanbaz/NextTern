import React from 'react';
import { ApplicationState, APPLICATION_STATE_META } from '../../../../shared/types/application-state';
import { cn } from '../../utils/cn';

interface ApplicationFlowProps {
  currentState: ApplicationState;
}

export const ApplicationFlow: React.FC<ApplicationFlowProps> = ({ currentState }) => {
  // Define the linear flow for visualization
  const flowSteps = [
    ApplicationState.DISCOVERED,
    ApplicationState.VIEWED,
    ApplicationState.SHORTLISTED,
    ApplicationState.CONTACTED,
    ApplicationState.INTERVIEWING,
    ApplicationState.DECIDED
  ];

  const currentIndex = flowSteps.indexOf(currentState);
  const isClosed = currentState === ApplicationState.CLOSED;

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex items-center min-w-max px-4">
        {flowSteps.map((step, index) => {
          const meta = APPLICATION_STATE_META[step];
          const isPast = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step} className="flex items-center">
              {/* Step Node */}
              <div className="flex flex-col items-center relative">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors z-10 bg-white",
                  isCurrent ? "border-indigo-600 text-indigo-600" : 
                  isPast ? "border-indigo-600 bg-indigo-600 text-white" : 
                  "border-gray-200 text-gray-300"
                )}>
                  {isPast ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <span className={cn(
                  "absolute top-10 text-xs font-medium whitespace-nowrap",
                  isCurrent ? "text-indigo-600" : "text-gray-500"
                )}>
                  {meta.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < flowSteps.length - 1 && (
                <div className={cn(
                  "w-12 h-0.5 mx-2",
                  index < currentIndex ? "bg-indigo-600" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
