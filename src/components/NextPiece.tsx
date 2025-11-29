// Next piece preview component

import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';

export function NextPiece() {
  const nextPiece = useGameStore(state => state.nextPiece);

  if (!nextPiece) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg min-w-[150px]">
        <h2 className="text-lg font-bold text-white mb-4 text-center">次のピース</h2>
        <div className="flex items-center justify-center h-24">
          <p className="text-gray-500">-</p>
        </div>
      </div>
    );
  }

  const { shape, type } = nextPiece;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg min-w-[150px]">
      <h2 className="text-lg font-bold text-white mb-4 text-center">次のピース</h2>
      <div className="flex items-center justify-center">
        <div 
          className="grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${shape[0].length}, minmax(0, 1fr))`,
          }}
        >
          {shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell === 1 ? type : null}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
