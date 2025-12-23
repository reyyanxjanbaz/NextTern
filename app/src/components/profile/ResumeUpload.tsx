import React, { useState } from 'react';
import { api } from '../../services/api';
import { ProfileCard } from '@shared/types/profile-card';

interface ResumeUploadProps {
  onUploadComplete: (data: Partial<ProfileCard['expanded']>) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Note: api.post handles JSON usually, for FormData we might need to adjust or use fetch directly
      // But our ApiClient checks for FormData
      const data = await api.post<Partial<ProfileCard['expanded']>>('/resume/parse', formData);
      onUploadComplete(data);
    } catch (err: any) {
      setError(err.message || 'Failed to parse resume');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
      <div className="space-y-2">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div className="text-sm text-gray-600">
          <label htmlFor="resume-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a resume</span>
            <input
              id="resume-upload"
              name="resume-upload"
              type="file"
              className="sr-only"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
          <p className="pl-1">to auto-fill your profile</p>
        </div>
        <p className="text-xs text-gray-500">PDF or DOCX up to 10MB</p>
      </div>

      {isUploading && (
        <div className="mt-4">
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="h-2 w-24 bg-indigo-200 rounded"></div>
          </div>
          <p className="text-xs text-indigo-600 mt-2">Parsing your resume...</p>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
