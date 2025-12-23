import React from 'react';
import { Heart, X } from 'lucide-react';
import { api } from '../../services/api';

interface ShortlistActionProps {
  candidateId: string;
  internshipId: string; // We need context
  onActionComplete?: () => void;
}

export const ShortlistAction: React.FC<ShortlistActionProps> = ({ candidateId, internshipId, onActionComplete }) => {
  const handleAction = async (action: 'shortlist' | 'pass') => {
    try {
      await api.post('/shortlist', {
        candidateId,
        internshipId,
        action
      });
      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleAction('pass')}
        className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
        title="Pass"
      >
        <X className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleAction('shortlist')}
        className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors"
        title="Shortlist"
      >
        <Heart className="w-5 h-5" />
      </button>
    </div>
  );
};
