import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';
import { getRotatedShape } from '../utils/collision';
import type { CellValue } from '../types/game';

/**
 * Board component - displays the game grid (20 rows x 10 columns)
 */
export function Board() {
  const grid = useGameStore((state) => state.grid);
  const currentPiece = useGameStore((state) => state.currentPiece);
  const isHardMode = useGameStore((state) => state.isHardMode);

  // Create a display grid that includes the current piece
  const displayGrid: CellValue[][] = grid.map((row) => [...row]);

  // Overlay the current piece on the display grid
  if (currentPiece) {
    const shape = getRotatedShape(currentPiece);

    // Place the current piece on the display grid
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row]?.length || 0; col++) {
        if (shape[row]?.[col]) {
          const gridX = currentPiece.position.x + col;
          const gridY = currentPiece.position.y + row;
          if (
            gridY >= 0 &&
            gridY < displayGrid.length &&
            gridX >= 0 &&
            gridX < (displayGrid[0]?.length || 0)
          ) {
            displayGrid[gridY][gridX] = currentPiece.type;
          }
        }
      }
    }
  }

  return (
    <div
      className={`grid grid-cols-10 gap-0 ${isHardMode ? 'bg-black' : 'border-2 border-gray-600 bg-gray-900'}`}
      style={{ width: '240px' }}
    >
      {displayGrid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-6 h-6"
            style={{ width: '24px', height: '24px' }}
          >
            <Cell type={cellValue} isHardMode={isHardMode} />
          </div>
        ))
      )}
    </div>
  );
}
