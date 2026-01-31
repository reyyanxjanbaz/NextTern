import { useState } from 'react';
import { PanInfo, useAnimation } from 'framer-motion';

interface SwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number; // Distance to trigger swipe
}

export const useSwipeGesture = ({ onSwipeLeft, onSwipeRight, threshold = 100 }: SwipeOptions) => {
  const controls = useAnimation();
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnd = async (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    setIsDragging(false);
    setDirection(null);

    if (offset > threshold || velocity > 500) {
      // Swipe Right
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
      onSwipeRight();
      // Reset position instantly after animation (handled by parent usually removing the card)
      controls.set({ x: 0, opacity: 1 });
    } else if (offset < -threshold || velocity < -500) {
      // Swipe Left
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
      onSwipeLeft();
      controls.set({ x: 0, opacity: 1 });
    } else {
      // Reset
      controls.start({ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  const onDrag = (event: any, info: PanInfo) => {
    setIsDragging(true);
    if (info.offset.x > 20) {
      setDirection('right');
    } else if (info.offset.x < -20) {
      setDirection('left');
    } else {
      setDirection(null);
    }
  };

  return {
    controls,
    onDragEnd,
    onDrag,
    direction,
    isDragging,
  };
};
