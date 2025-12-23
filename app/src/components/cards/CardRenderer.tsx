import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardAction } from '@shared/types/card';
import { CardActions } from './CardActions';
import { CardExpandTransition, CardHoverAnimation } from './CardAnimations';
import { cn } from '@/utils/cn';
import * as Icons from 'lucide-react';

interface CardRendererProps {
  card: Card;
  onAction?: (action: CardAction) => void;
  className?: string;
  defaultExpanded?: boolean;
  renderSection?: (section: any) => React.ReactNode;
}

export const CardRenderer: React.FC<CardRendererProps> = ({
  card,
  onAction,
  className,
  defaultExpanded = false,
  renderSection,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action: CardAction) => {
    if (onAction) {
      onAction(action);
    }
    // Prevent card toggle when clicking action
  };

  const renderVisual = () => {
    const { visual } = card.summary;
    if (!visual) return null;

    if (visual.type === 'image' && visual.src) {
      return (
        <img
          src={visual.src}
          alt={visual.alt || ''}
          className="w-12 h-12 rounded-full object-cover"
        />
      );
    }

    if (visual.type === 'icon' && visual.fallback) {
      // @ts-ignore
      const Icon = (Icons[visual.fallback as keyof typeof Icons] || Icons.Circle) as React.ElementType;
      return (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
          <Icon className="w-6 h-6" />
        </div>
      );
    }

    if (visual.type === 'initials' && visual.fallback) {
      return (
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          {visual.fallback}
        </div>
      );
    }

    return null;
  };

  const renderStatusIndicator = () => {
    const { statusIndicator } = card.summary;
    if (!statusIndicator) return null;

    const variants = {
      neutral: 'bg-gray-100 text-gray-800',
      positive: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      negative: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variants[statusIndicator.variant]
        )}
      >
        {statusIndicator.label}
      </span>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={CardHoverAnimation.whileHover}
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-5 cursor-pointer transition-colors',
        'hover:border-gray-300',
        className
      )}
      onClick={handleToggle}
    >
      {/* Summary View */}
      <div className="flex items-start gap-4">
        {renderVisual()}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {card.summary.headline}
            </h3>
            {renderStatusIndicator()}
          </div>
          
          {card.summary.subheadline && (
            <p className="text-sm text-gray-500 mt-1">
              {card.summary.subheadline}
            </p>
          )}

          {card.summary.metadata && card.summary.metadata.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
              {card.summary.metadata.map((meta, index) => (
                <div key={index} className="flex items-center gap-1">
                  {meta.icon && (() => {
                    // @ts-ignore
                    const Icon = Icons[meta.icon as keyof typeof Icons] as React.ElementType;
                    return Icon ? <Icon className="w-4 h-4" /> : null;
                  })()}
                  <span className="font-medium text-gray-700">{meta.label}:</span>
                  <span>{meta.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-gray-400">
          {isExpanded ? (
            <Icons.ChevronUp className="w-5 h-5" />
          ) : (
            <Icons.ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {/* Expanded View */}
      <CardExpandTransition isExpanded={isExpanded}>
        <div className="pt-4 border-t border-gray-100 mt-4">
          {card.expanded.description && (
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>{card.expanded.description}</p>
            </div>
          )}

          {card.expanded.sections && card.expanded.sections.map((section) => (
            <div key={section.id} className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                {section.title}
              </h4>
              <div className="text-sm text-gray-600">
                {renderSection ? (
                  renderSection(section)
                ) : typeof section.content === 'string' ? (
                  <p>{section.content}</p>
                ) : (
                  <pre className="text-xs bg-gray-50 p-2 rounded">
                    {JSON.stringify(section.content, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ))}

          {/* Actions */}
          <CardActions actions={card.actions} onAction={handleAction} />
        </div>
      </CardExpandTransition>
    </motion.div>
  );
};
