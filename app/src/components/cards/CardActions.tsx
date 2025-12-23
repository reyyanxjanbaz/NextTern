import React from 'react';
import { CardAction } from '@shared/types/card';
import { cn } from '@/utils/cn';
import * as Icons from 'lucide-react';

interface CardActionsProps {
  actions: CardAction[];
  onAction: (action: CardAction) => void;
  className?: string;
}

export const CardActions: React.FC<CardActionsProps> = ({
  actions,
  onAction,
  className,
}) => {
  if (!actions || actions.length === 0) return null;

  // Sort actions: primary first, then secondary, then danger
  const sortedActions = [...actions].sort((a, b) => {
    const order = { primary: 0, secondary: 1, danger: 2 };
    return order[a.type] - order[b.type];
  });

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    // @ts-ignore - Dynamic icon access
    const Icon = (Icons[iconName as keyof typeof Icons] || Icons.Circle) as React.ElementType;
    return <Icon className="w-4 h-4 mr-2" />;
  };

  return (
    <div className={cn('flex flex-wrap gap-2 mt-4', className)}>
      {sortedActions.map((action) => {
        if (!action.enabled) return null;

        return (
          <button
            key={action.id}
            onClick={(e) => {
              e.stopPropagation();
              onAction(action);
            }}
            className={cn(
              'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
              {
                // Primary
                'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500':
                  action.type === 'primary',
                // Secondary
                'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500':
                  action.type === 'secondary',
                // Danger
                'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500':
                  action.type === 'danger',
              }
            )}
          >
            {getIcon(action.icon)}
            {action.label}
          </button>
        );
      })}
    </div>
  );
};
