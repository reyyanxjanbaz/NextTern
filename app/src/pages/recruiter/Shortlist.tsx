import React, { useState, useEffect } from 'react';
import { ProfileCard as ProfileCardType } from '../../../../shared/types/profile-card';
import ProfileCard from '../../components/cards/ProfileCard';
import { api } from '../../services/api';

export const Shortlist: React.FC = () => {
  const [candidates, setCandidates] = useState<ProfileCardType[]>([]);
  const [loading, setLoading] = useState(true);
  // TODO: Get internshipId from context or route params
  const internshipId = 'dummy-internship-id'; 

  useEffect(() => {
    fetchShortlist();
  }, []);

  const fetchShortlist = async () => {
    setLoading(true);
    try {
      // The API returns applications, we need to extract profiles
      // Or the API should return profiles directly?
      // The service returns applications with included profile.
      // Let's assume we map it here or the API is adjusted.
      // For now, I'll assume the API returns a list of objects that contain the profile.
      
      // const res = await api.get<any[]>(`/shortlist/${internshipId}`);
      // setCandidates(res.map((app: any) => app.profile));
      
      setCandidates([]);
    } catch (error) {
      console.error('Failed to fetch shortlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shortlisted Candidates</h1>
      
      {loading ? (
        <div>Loading...</div>
      ) : candidates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No candidates shortlisted yet.</p>
          <p className="text-sm text-gray-400 mt-2">Go to Discovery to find candidates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <div key={candidate.id}>
              <ProfileCard 
                card={candidate} 
                isExpanded={false}
                onAction={() => {}}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
