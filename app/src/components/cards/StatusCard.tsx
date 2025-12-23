import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Building, Briefcase } from 'lucide-react';
import { StatusCard as StatusCardType } from '../../../../shared/types/status-card';
import { APPLICATION_STATE_META } from '../../../../shared/types/application-state';
import { NextOutcomes } from '../status/NextOutcomes';
import { StaleIndicator } from '../status/StaleIndicator';
import { cn } from '../../utils/cn';

interface StatusCardProps {
  card: StatusCardType;
  onAction: (actionId: string, payload?: any) => void;
}

export const StatusCard: React.FC<StatusCardProps> = ({ card, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { summary, expanded } = card;
  const meta = APPLICATION_STATE_META[summary.currentState];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      {/* Summary View */}
      <div 
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            {/* Company Logo Placeholder */}
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
              {summary.internship.logoUrl ? (
                <img src={summary.internship.logoUrl} alt={summary.internship.company} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Building className="w-6 h-6" />
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">{summary.internship.title}</h3>
              <p className="text-sm text-gray-500">{summary.internship.company}</p>
              
              <div className="flex items-center gap-3 mt-2">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  // Map state colors to Tailwind classes (simplified mapping)
                  meta.color === 'state-discovered' && "bg-blue-50 text-blue-700",
                  meta.color === 'state-viewed' && "bg-indigo-50 text-indigo-700",
                  meta.color === 'state-shortlisted' && "bg-purple-50 text-purple-700",
                  meta.color === 'state-contacted' && "bg-yellow-50 text-yellow-700",
                  meta.color === 'state-interviewing' && "bg-orange-50 text-orange-700",
                  meta.color === 'state-decided' && "bg-green-50 text-green-700",
                  meta.color === 'state-closed' && "bg-gray-100 text-gray-700"
                )}>
                  {meta.label}
                </span>
                
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {summary.timeInState.durationText}
                </div>
              </div>
            </div>
          </div>

          <button className="text-gray-400 hover:text-gray-600">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Stale Indicator */}
        <div className="mt-3">
          <StaleIndicator 
            isStale={summary.timeInState.isStale} 
            daysInState={summary.timeInState.duration.days}
            threshold={summary.timeInState.staleThresholdDays}
          />
        </div>
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 bg-gray-50"
          >
            <div className="p-5 space-y-6">
              {/* State Description */}
              <div>
                <p className="text-sm text-gray-600">{meta.description}</p>
              </div>

              {/* Next Outcomes */}
              <NextOutcomes outcomes={expanded.nextOutcomes} />

              {/* History Timeline (Simplified) */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  History
                </h4>
                <div className="space-y-4 relative pl-4 border-l-2 border-gray-200 ml-2">
                  {expanded.stateHistory.map((entry, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
                      <p className="text-sm font-medium text-gray-900">
                        {APPLICATION_STATE_META[entry.toState].label}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {expanded.studentActions.includes('withdraw') && (
                  <button 
                    onClick={() => onAction('withdraw')}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Withdraw
                  </button>
                )}
                {expanded.chatAvailable && (
                  <button 
                    onClick={() => onAction('open-chat')}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex-1"
                  >
                    Open Chat
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
