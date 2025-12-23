import React, { useState } from 'react';
import { ApplicationState, ClosureReason, CLOSURE_REASON_META } from '@nexttern/shared';
import { motion, AnimatePresence } from 'framer-motion';

interface DecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: ClosureReason, note: string) => void;
  type: 'accept' | 'reject';
}

export const DecisionModal: React.FC<DecisionModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  type 
}) => {
  const [note, setNote] = useState('');
  const [reason, setReason] = useState<ClosureReason>(
    type === 'accept' ? ClosureReason.ACCEPTED : ClosureReason.REJECTED
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason, note);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className={`p-6 border-b ${type === 'accept' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <h3 className={`text-lg font-semibold ${type === 'accept' ? 'text-green-800' : 'text-red-800'}`}>
                {type === 'accept' ? 'Extend Offer' : 'Decline Candidate'}
              </h3>
              <p className={`text-sm mt-1 ${type === 'accept' ? 'text-green-600' : 'text-red-600'}`}>
                {type === 'accept' 
                  ? 'Great news! Confirm the details below.' 
                  : 'Please provide a reason for closing this application.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {type === 'reject' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as ClosureReason)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value={ClosureReason.REJECTED}>Not Selected</option>
                    <option value={ClosureReason.CANCELLED}>Position Cancelled</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note (Internal Only)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add context for your team..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                    type === 'accept' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirm Decision
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
