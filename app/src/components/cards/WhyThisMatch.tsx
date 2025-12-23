import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { MatchExplanation } from '../matching/MatchExplanation';

interface WhyThisMatchProps {
  internshipId: string;
}

export const WhyThisMatch: React.FC<WhyThisMatchProps> = ({ internshipId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm hover:bg-blue-50 transition-colors group"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-500 group-hover:text-blue-600" />
        <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700">
          Why this match?
        </span>
      </button>

      <MatchExplanation
        internshipId={internshipId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
