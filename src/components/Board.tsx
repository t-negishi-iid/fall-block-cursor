import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';

/**
 * Board component - displays the game grid (20 rows x 10 columns)
 */
export function Board() {
  const grid = useGameStore((state) => state.grid);

  // Debug: Log grid dimensions
  console.log('Grid dimensions:', grid.length, 'rows x', grid[0]?.length, 'columns');
  const totalCells = grid.length * (grid[0]?.length || 0);
  console.log('Total cells to render:', totalCells);

  return (
    <div
      className="grid grid-cols-10 gap-0 border-2 border-gray-600 bg-gray-900"
      style={{ width: '240px' }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-6 h-6"
            style={{ width: '24px', height: '24px' }}
          >
            <Cell type={cellValue} />
          </div>
        ))
      )}
    </div>
  );
}
