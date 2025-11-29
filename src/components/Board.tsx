// Game board component

import { useGameStore } from '../store/gameStore';
import { Cell } from './Cell';
import type { Board as BoardType } from '../types/game';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../types/game';
import { getPieceCells } from '../utils/pieces';

export function Board() {
  const board = useGameStore(state => state.board);
  const currentPiece = useGameStore(state => state.currentPiece);

  // Create a display board with the current piece overlaid
  const getDisplayBoard = (): { value: BoardType[number][number]; isCurrentPiece: boolean }[][] => {
    const displayBoard: { value: BoardType[number][number]; isCurrentPiece: boolean }[][] = 
      board.map(row => row.map(cell => ({ value: cell, isCurrentPiece: false })));

    if (currentPiece) {
      const cells = getPieceCells(currentPiece);
      for (const cell of cells) {
        if (cell.y >= 0 && cell.y < BOARD_HEIGHT && cell.x >= 0 && cell.x < BOARD_WIDTH) {
          displayBoard[cell.y][cell.x] = {
            value: currentPiece.type,
            isCurrentPiece: true,
          };
        }
      }
    }

    return displayBoard;
  };

  const displayBoard = getDisplayBoard();

  return (
    <div className="bg-gray-800 p-2 rounded-lg shadow-lg">
      <div 
        className="grid gap-0"
        style={{ 
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
        }}
      >
        {displayBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell.value}
              isCurrentPiece={cell.isCurrentPiece}
            />
          ))
        )}
      </div>
    </div>
  );
}
