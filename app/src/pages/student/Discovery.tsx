import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { InternshipCard as InternshipCardType } from '../../../../shared/types/internship-card';
import SwipeContainer from '../../components/discovery/SwipeContainer';

export default function Discovery() {
  const [cards, setCards] = useState<InternshipCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInternships();
  }, []);

  const loadInternships = async () => {
    try {
      setLoading(true);
      const res = await api.get('/interest/discover');
      setCards((res as any).data);
    } catch (error) {
      console.error('Failed to load internships', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (cardId: string, direction: 'left' | 'right') => {
    const action = direction === 'right' ? 'interested' : 'pass';
    await api.post('/interest/swipe', { internshipId: cardId, action });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover Opportunities</h1>
          <p className="mt-2 text-gray-600">Swipe right to express interest, left to pass.</p>
        </div>

        <SwipeContainer
          cards={cards}
          onSwipe={handleSwipe}
          onEmpty={() => console.log('Empty!')}
          onRefresh={loadInternships}
        />
      </div>
    </div>
  );
}
