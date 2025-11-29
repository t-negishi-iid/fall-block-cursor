import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';
import { getRotatedShape } from '../utils/collision';
import type { CellValue } from '../types/game';

/**
 * NextPiece component - displays the next tetromino in a 4x4 grid
 */
export function NextPiece() {
  const nextPiece = useGameStore((state) => state.nextPiece);

  // Create a 4x4 display grid
  const displayGrid: CellValue[][] = Array(4)
    .fill(null)
    .map(() => Array(4).fill(0) as CellValue[]);

  if (nextPiece) {
    const shape = getRotatedShape(nextPiece);
    const offsetX = Math.floor((4 - (shape[0]?.length || 0)) / 2);
    const offsetY = Math.floor((4 - shape.length) / 2);

    // Place the next piece in the center of the 4x4 grid
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row]?.length || 0; col++) {
        if (shape[row]?.[col]) {
          const gridX = offsetX + col;
          const gridY = offsetY + row;
          if (gridY >= 0 && gridY < 4 && gridX >= 0 && gridX < 4) {
            displayGrid[gridY][gridX] = nextPiece.type;
          }
        }
      }
    }
  }

  return (
    <div className="bg-gray-900 border-2 border-purple-500 rounded-lg p-4 shadow-lg shadow-purple-500/20">
      <h2 className="text-xl font-bold text-purple-400 mb-4 text-center">NEXT</h2>
      <div className="grid grid-cols-4 gap-0 w-fit mx-auto border border-purple-500/30 bg-gray-800">
        {displayGrid.map((row, rowIndex) =>
          row.map((cellValue, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-4 h-4"
              style={{ width: '16px', height: '16px' }}
            >
              <Cell type={cellValue} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
