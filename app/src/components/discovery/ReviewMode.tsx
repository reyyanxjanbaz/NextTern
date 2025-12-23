import React, { useState, useEffect } from 'react';
import { ProfileCard as ProfileCardType } from '../../../../shared/types/profile-card';
import ProfileCard from '../cards/ProfileCard';
import { FilterControls } from './FilterControls';
import { ComparisonView } from './ComparisonView';
import { api } from '../../services/api';

export const ReviewMode: React.FC = () => {
  const [candidates, setCandidates] = useState<ProfileCardType[]>([]);
  const [selectedForComparison, setSelectedForComparison] = useState<ProfileCardType[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const res = await api.get<ProfileCardType[]>('/discovery/candidates?mode=review');
      // setCandidates(res);
      setCandidates([]);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Refetch with filters
  };

  const toggleComparison = (candidate: ProfileCardType) => {
    if (selectedForComparison.find(c => c.id === candidate.id)) {
      setSelectedForComparison(prev => prev.filter(c => c.id !== candidate.id));
    } else {
      if (selectedForComparison.length < 3) {
        setSelectedForComparison(prev => [...prev, candidate]);
      } else {
        alert('You can compare up to 3 candidates');
      }
    }
  };

  if (showComparison) {
    return <ComparisonView candidates={selectedForComparison} onClose={() => setShowComparison(false)} />;
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <FilterControls onFilterChange={handleFilterChange} />
      
      {selectedForComparison.length > 0 && (
        <div className="bg-indigo-50 p-2 flex justify-between items-center px-4 border-b border-indigo-100">
          <span className="text-sm text-indigo-700">{selectedForComparison.length} candidates selected</span>
          <button 
            onClick={() => setShowComparison(true)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Compare Selected
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No candidates found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map(candidate => (
              <div key={candidate.id} className="relative">
                <div className="absolute top-2 right-2 z-10">
                  <input 
                    type="checkbox" 
                    checked={!!selectedForComparison.find(c => c.id === candidate.id)}
                    onChange={() => toggleComparison(candidate)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
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
    </div>
  );
};
