import type { CellValue } from '../types/game';
import { getTetrominoColor } from '../utils/pieces';

interface CellProps {
  type: CellValue;
  isHardMode?: boolean;
}

/**
 * Cell component - displays a single block in the grid
 */
export function Cell({ type, isHardMode = false }: CellProps) {
  // Empty cell (type = 0)
  if (type === 0) {
    // Hard mode: completely black with no border
    if (isHardMode) {
      return <div className="w-full h-full bg-black" />;
    }
    // Normal mode: light gray background with border
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
