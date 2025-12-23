import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface SwipeFeedbackProps {
  direction: 'left' | 'right' | null;
}

export default function SwipeFeedback({ direction }: SwipeFeedbackProps) {
  return (
    <AnimatePresence>
      {direction === 'right' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute top-10 left-10 z-50 pointer-events-none"
        >
          <div className="bg-green-500 text-white px-6 py-2 rounded-full border-4 border-white shadow-lg transform -rotate-12 flex items-center gap-2">
            <Heart className="w-8 h-8 fill-current" />
            <span className="text-2xl font-bold uppercase tracking-wider">Interested</span>
          </div>
        </motion.div>
      )}

      {direction === 'left' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute top-10 right-10 z-50 pointer-events-none"
        >
          <div className="bg-red-500 text-white px-6 py-2 rounded-full border-4 border-white shadow-lg transform rotate-12 flex items-center gap-2">
            <X className="w-8 h-8" />
            <span className="text-2xl font-bold uppercase tracking-wider">Pass</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
