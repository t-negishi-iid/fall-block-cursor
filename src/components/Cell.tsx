// Individual cell component

import { motion } from 'framer-motion';
import type { CellValue } from '../types/game';
import { PIECE_COLORS } from '../types/game';

interface CellProps {
  value: CellValue;
  isCurrentPiece?: boolean;
}

export function Cell({ value, isCurrentPiece = false }: CellProps) {
  const baseClasses = 'w-6 h-6 border border-gray-700 rounded-sm';
  
  if (value === null) {
    return (
      <div className={`${baseClasses} bg-gray-900`} />
    );
  }

  const colorClass = PIECE_COLORS[value];

  return (
    <motion.div
      className={`${baseClasses} ${colorClass}`}
      initial={isCurrentPiece ? { scale: 0.8 } : false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.1 }}
    />
  );
}
