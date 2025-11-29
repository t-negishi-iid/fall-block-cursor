import type { CellValue } from '../types/game';
import { getTetrominoColor } from '../utils/pieces';

interface CellProps {
  type: CellValue;
}

/**
 * Cell component - displays a single block in the grid
 */
export function Cell({ type }: CellProps) {
  // Empty cell (type = 0) - light gray background
  if (type === 0) {
    return (
      <div className="w-full h-full bg-gray-800 border border-gray-700" />
    );
  }

  // Filled cell - use tetromino color
  const colorClass = getTetrominoColor(type as 1 | 2 | 3 | 4 | 5 | 6 | 7);

  return (
    <div className={`w-full h-full ${colorClass} border border-gray-900`} />
  );
}
