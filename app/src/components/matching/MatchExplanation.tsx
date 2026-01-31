import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { api } from '../../services/api';
import { AlignmentFactors } from './AlignmentFactors';

interface MatchExplanationProps {
  internshipId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MatchExplanation: React.FC<MatchExplanationProps> = ({ 
  internshipId, 
  isOpen, 
  onClose 
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      api.get(`/matches/explain/${internshipId}`)
        .then(res => setData((res as any).data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, internshipId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden pointer-events-auto relative max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h3 className="font-semibold text-gray-900">Why this match?</h3>
                <p className="text-xs text-blue-600 font-medium">
                  {loading ? 'Analyzing...' : `${data?.overallScore}% Match Score`}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                </div>
              ) : data ? (
                <>
                  <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-900 leading-relaxed">
                      {data.explanation}
                    </p>
                  </div>
                  
                  <AlignmentFactors factors={data.factors} />
                </>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Could not load explanation.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
