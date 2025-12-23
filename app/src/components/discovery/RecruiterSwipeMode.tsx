import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { ProfileCard as ProfileCardType } from '../../../../shared/types/profile-card';
import ProfileCard from '../cards/ProfileCard';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import SwipeFeedback from './SwipeFeedback';
import { api } from '../../services/api';

export const RecruiterSwipeMode: React.FC = () => {
  const [cards, setCards] = useState<ProfileCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      // const res = await api.get<ProfileCardType[]>('/discovery/candidates');
      // setCards(res);
      
      // Mock data for now
      setCards([]); 
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeCard = cards[0];

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!activeCard) return;

    const newCards = cards.slice(1);
    setCards(newCards);

    try {
      await api.post('/shortlist', {
        candidateId: activeCard.userId,
        action: direction === 'right' ? 'shortlist' : 'pass'
      });
    } catch (error) {
      console.error('Swipe action failed:', error);
      // Optionally revert state
    }
  };

  const { controls, onDrag, onDragEnd, direction } = useSwipeGesture({
    onSwipeLeft: () => handleSwipe('left'),
    onSwipeRight: () => handleSwipe('right'),
  });

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading candidates...</div>;
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500 space-y-4">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">No more candidates to review!</p>
          <p className="text-sm text-gray-500">Check back later for new profiles.</p>
        </div>
        <button
          onClick={fetchCandidates}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Refresh Feed
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px] flex items-center justify-center mt-8">
      <AnimatePresence>
        {cards.map((card, index) => {
          const isTop = index === 0;
          if (index > 1) return null;

          return (
            <motion.div
              key={card.id}
              style={{
                zIndex: cards.length - index,
                position: 'absolute',
                width: '100%',
              }}
              initial={{ scale: 1 - index * 0.05, y: index * 10, opacity: 1 - index * 0.2 }}
              animate={{ 
                scale: 1 - index * 0.05, 
                y: index * 10, 
                opacity: 1 - index * 0.2,
                x: isTop ? 0 : undefined
              }}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDrag={isTop ? onDrag : undefined}
              onDragEnd={isTop ? onDragEnd : undefined}
              // @ts-ignore
              animate={isTop ? controls : undefined}
              className="cursor-grab active:cursor-grabbing"
            >
              {isTop && <SwipeFeedback direction={direction} />}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <ProfileCard 
                  card={card} 
                  isExpanded={true}
                  onAction={() => {}}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="absolute -bottom-20 flex gap-8">
        <button
          onClick={() => controls.start({ x: -500, opacity: 0 }).then(() => handleSwipe('left'))}
          className="p-4 bg-white rounded-full shadow-lg text-red-500 hover:bg-red-50 transition-colors"
          aria-label="Pass"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => controls.start({ x: 500, opacity: 0 }).then(() => handleSwipe('right'))}
          className="p-4 bg-white rounded-full shadow-lg text-green-500 hover:bg-green-50 transition-colors"
          aria-label="Shortlist"
        >
          <Heart className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
};
