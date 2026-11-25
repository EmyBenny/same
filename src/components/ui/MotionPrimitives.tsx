import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const CinematicPage: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.34, ease: CINEMATIC_EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const CinematicStagger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.055,
          delayChildren: 0.03,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const CinematicItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 14, scale: 0.99 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.38, ease: CINEMATIC_EASE },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const CinematicInteractiveCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}> = ({ children, onClick, className, active = false }) => (
  <motion.div
    whileHover={onClick ? { y: -2 } : undefined}
    whileTap={onClick ? { scale: 0.982 } : undefined}
    transition={{ duration: 0.18, ease: CINEMATIC_EASE }}
    onClick={onClick}
    className={cn(
      'bg-white border rounded-xl transition-colors',
      active ? 'border-[#0D7A68] ring-1 ring-[#0D7A68]/25' : 'border-[#E5E4DF]',
      onClick && 'cursor-pointer hover:border-[#B7D4C7]',
      className
    )}
  >
    {children}
  </motion.div>
);
