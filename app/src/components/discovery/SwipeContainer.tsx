import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InternshipCard as InternshipCardType } from '../../../../shared/types/internship-card';
import InternshipCard from '../cards/InternshipCard';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import SwipeFeedback from './SwipeFeedback';
import SwipeLimitIndicator from './SwipeLimitIndicator';
import { api } from '../../services/api';

interface SwipeContainerProps {
  cards: InternshipCardType[];
  onSwipe: (cardId: string, direction: 'left' | 'right') => void;
  onEmpty: () => void;
  onRefresh?: () => void;
}

export default function SwipeContainer({ cards: initialCards, onSwipe, onEmpty, onRefresh }: SwipeContainerProps) {
  const [cards, setCards] = useState<InternshipCardType[]>(initialCards);
  const [limitStatus, setLimitStatus] = useState({ reached: false, remaining: 50, limit: 50 });

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  useEffect(() => {
    // Fetch initial limit status
    api.get('/interest/limit').then((res) => setLimitStatus(res.data));
  }, []);

  const activeCard = cards[0];

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!activeCard) return;

    // Optimistic update
    const newCards = cards.slice(1);
    setCards(newCards);
    setLimitStatus(prev => ({ ...prev, remaining: Math.max(0, prev.remaining - 1) }));

    try {
      await onSwipe(activeCard.id, direction);
      if (newCards.length === 0) {
        onEmpty();
      }
    } catch (error) {
      // Revert on error (e.g. limit reached)
      console.error('Swipe failed:', error);
      setCards([activeCard, ...newCards]);
      // Refresh limit status to be sure
      api.get('/interest/limit').then((res) => setLimitStatus(res.data));
    }
  };

  const { controls, onDrag, onDragEnd, direction, isDragging } = useSwipeGesture({
    onSwipeLeft: () => handleSwipe('left'),
    onSwipeRight: () => handleSwipe('right'),
  });

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500 space-y-4">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">No more internships to show!</p>
          <p className="text-sm text-gray-500">Check back later for new opportunities.</p>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Refresh Feed
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px] flex items-center justify-center">
      <SwipeLimitIndicator remaining={limitStatus.remaining} limit={limitStatus.limit} />

      <AnimatePresence>
        {cards.map((card, index) => {
          const isTop = index === 0;
          // Only render top 2 cards for performance
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
                x: isTop ? 0 : undefined // Only animate x for top card via controls
              }}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDrag={isTop ? onDrag : undefined}
              onDragEnd={isTop ? onDragEnd : undefined}
              // @ts-ignore - Framer motion types issue with controls
              animate={isTop ? controls : undefined}
              className="cursor-grab active:cursor-grabbing"
            >
              {isTop && <SwipeFeedback direction={direction} />}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <InternshipCard 
                  card={card} 
                  isExpanded={true} // Always show expanded details in discovery
                  onAction={() => {}} // Disable standard actions in swipe mode
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Manual Controls for Accessibility */}
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
          aria-label="Interested"
        >
          <Heart className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
}

import { X, Heart } from 'lucide-react';
