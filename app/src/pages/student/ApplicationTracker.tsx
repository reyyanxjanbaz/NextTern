import React, { useState, useEffect } from 'react';
import { StatusCard as StatusCardType } from '../../../../shared/types/status-card';
import { StatusCard } from '../../components/cards/StatusCard';
import { SilenceAlert } from '../../components/status/SilenceAlert';
import { api } from '../../services/api';

export const ApplicationTracker: React.FC = () => {
  const [applications, setApplications] = useState<StatusCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const res = await api.get<StatusCardType[]>('/student/applications');
      // setApplications(res);
      setApplications([]);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (actionId: string, payload?: any) => {
    console.log('Action triggered:', actionId, payload);
    // Implement action logic (withdraw, open chat, etc.)
  };

  const staleCount = applications.filter(app => app.summary.timeInState.isStale).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Application Tracker</h1>
        <p className="text-gray-500 mt-1">Track the status of your applications in real-time.</p>
      </div>

      <SilenceAlert staleCount={staleCount} />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
          <p className="text-gray-500">You haven't applied to any internships yet.</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            Discover Internships
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <StatusCard 
              key={app.applicationId} 
              card={app} 
              onAction={handleAction} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
