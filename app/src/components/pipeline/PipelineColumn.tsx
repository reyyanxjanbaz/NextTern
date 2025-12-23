import React from 'react';
import { ApplicationState, APPLICATION_STATE_META } from '@nexttern/shared';
import { PipelineCard } from './PipelineCard';
import { cn } from '../../utils/cn';

interface PipelineColumnProps {
  state: ApplicationState;
  applications: any[];
  onDrop: (applicationId: string, newState: ApplicationState) => void;
}

export const PipelineColumn: React.FC<PipelineColumnProps> = ({ state, applications, onDrop }) => {
  const meta = APPLICATION_STATE_META[state];
  const [isOver, setIsOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const applicationId = e.dataTransfer.getData('applicationId');
    if (applicationId) {
      onDrop(applicationId, state);
    }
  };

  return (
    <div 
      className={cn(
        "flex-shrink-0 w-80 flex flex-col h-full rounded-xl transition-colors",
        isOver ? "bg-blue-50 ring-2 ring-blue-200" : "bg-gray-50/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className={cn("p-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-inherit rounded-t-xl z-10")}>
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", `bg-${meta.color}`)} />
          <h3 className="font-semibold text-gray-700 text-sm">{meta.label}</h3>
          <span className="bg-gray-200 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-2 min-h-[100px]">
        {applications.map((app) => (
          <div 
            key={app.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('applicationId', app.id);
            }}
          >
            <PipelineCard application={app} />
          </div>
        ))}
        {applications.length === 0 && (
          <div className="h-24 flex items-center justify-center text-gray-400 text-xs border-2 border-dashed border-gray-200 rounded-lg m-1">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
};
