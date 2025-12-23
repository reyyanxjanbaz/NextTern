import React from 'react';
import { ProfileCard } from '@shared/types/profile-card';

interface ResumeVerificationProps {
  parsedData: Partial<ProfileCard['expanded']>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResumeVerification: React.FC<ResumeVerificationProps> = ({ parsedData, onConfirm, onCancel }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Resume Parsed Successfully</h3>
        <p className="mt-1 text-sm text-gray-500">
          We've extracted the following information. Please verify it before continuing.
        </p>
      </div>

      <div className="space-y-6 border-t border-gray-200 pt-6">
        {parsedData.identity && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Identity</h4>
            <div className="bg-gray-50 rounded p-3 text-sm">
              <p><span className="font-medium">Name:</span> {parsedData.identity.name}</p>
              <p><span className="font-medium">Headline:</span> {parsedData.identity.headline}</p>
              {parsedData.identity.education && (
                <p><span className="font-medium">Education:</span> {parsedData.identity.education.degree} in {parsedData.identity.education.field}</p>
              )}
            </div>
          </div>
        )}

        {parsedData.roleIntent && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Intent</h4>
            <div className="bg-gray-50 rounded p-3 text-sm">
              <p><span className="font-medium">Roles:</span> {parsedData.roleIntent.roleTypes.join(', ')}</p>
              <p><span className="font-medium">Statement:</span> {parsedData.roleIntent.statement}</p>
            </div>
          </div>
        )}

        {parsedData.skills && parsedData.skills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Skills Found</h4>
            <div className="flex flex-wrap gap-2">
              {parsedData.skills.map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Discard
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Confirm & Use
        </button>
      </div>
    </div>
  );
};
