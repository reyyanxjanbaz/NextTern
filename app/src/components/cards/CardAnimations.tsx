import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardExpandTransitionProps {
  isExpanded: boolean;
  children: ReactNode;
}

export const CardExpandTransition: React.FC<CardExpandTransitionProps> = ({
  isExpanded,
  children,
}) => {
  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={{
            expanded: { opacity: 1, height: 'auto', marginTop: 16 },
            collapsed: { opacity: 0, height: 0, marginTop: 0 },
          }}
          transition={{
            duration: 0.2, // 200ms from motion tokens
            ease: [0.2, 0, 0, 1], // emphasized easing from motion tokens
          }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const CardHoverAnimation = {
  whileHover: {
    y: -2,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)', // shadow.hover
    transition: {
      duration: 0.15, // 150ms
      ease: [0.4, 0, 0.2, 1] as const, // ease
    },
  },
};
