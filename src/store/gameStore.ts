import { create } from 'zustand';
import type { CellValue, Grid, Tetromino, TetrominoType, GameState as IGameState } from '../types/game';
import { isValidPosition, getRotatedShape } from '../utils/collision';

/**
 * Game store state interface
 */
interface GameStore extends IGameState {
  // Actions
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  drop: () => void;
}

/**
 * Grid dimensions
 */
const GRID_ROWS = 20;
const GRID_COLS = 10;

/**
 * Create an empty grid (20 rows x 10 columns)
 */
function createEmptyGrid(): Grid {
  const grid: Grid = [];
  for (let y = 0; y < GRID_ROWS; y++) {
    const row: CellValue[] = [];
    for (let x = 0; x < GRID_COLS; x++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Generate a random tetromino type
 */
function getRandomTetrominoType(): TetrominoType {
  return (Math.floor(Math.random() * 7) + 1) as TetrominoType;
}

/**
 * Spawn a new tetromino at the top center of the grid
 */
function spawnTetromino(): Tetromino {
  const type = getRandomTetrominoType();
  const shape = getTetrominoShape(type);
  const startX = Math.floor((GRID_COLS - (shape[0]?.length || 0)) / 2);
  const startY = 0;

  return {
    type,
    position: { x: startX, y: startY },
    rotation: 0,
  };
}

/**
 * Place a tetromino on the grid
 */
function placeTetrominoOnGrid(grid: Grid, tetromino: Tetromino): Grid {
  const newGrid = grid.map((row) => [...row]);
  const rotatedShape = getRotatedShape(tetromino);

  // Place the tetromino on the grid
  for (let row = 0; row < rotatedShape.length; row++) {
    for (let col = 0; col < rotatedShape[row]?.length || 0; col++) {
      if (rotatedShape[row]?.[col]) {
        const gridX = tetromino.position.x + col;
        const gridY = tetromino.position.y + row;
        if (gridY >= 0 && gridY < GRID_ROWS && gridX >= 0 && gridX < GRID_COLS) {
          newGrid[gridY][gridX] = tetromino.type;
        }
      }
    }
  }

  return newGrid;
}

/**
 * Clear completed lines and return the new grid and number of lines cleared
 */
function clearLines(grid: Grid): { newGrid: Grid; linesCleared: number } {
  const newGrid: Grid = [];
  let linesCleared = 0;

  // Check each row from bottom to top
  for (let y = GRID_ROWS - 1; y >= 0; y--) {
    const row = grid[y];
    const isFullLine = row?.every((cell) => cell !== 0) ?? false;

    if (!isFullLine) {
      newGrid.unshift([...row]);
    } else {
      linesCleared++;
    }
  }

  // Add empty rows at the top if lines were cleared
  while (newGrid.length < GRID_ROWS) {
    newGrid.unshift(Array(GRID_COLS).fill(0) as CellValue[]);
  }

  return { newGrid, linesCleared };
}

/**
 * Check if game is over (new piece cannot be spawned)
 */
function checkGameOver(grid: Grid, tetromino: Tetromino): boolean {
  return !isValidPosition(grid, tetromino);
}

/**
 * Game store using Zustand
 */
export const useGameStore = create<GameStore>((set, get) => {
  // Initialize with a spawned piece
  const initialGrid = createEmptyGrid();
  const initialPiece = spawnTetromino();

  return {
    // Initial state
    grid: initialGrid,
    currentPiece: initialPiece,
    isGameOver: false,
    isPaused: false,

    // Actions
    moveLeft: () => {
      const state = get();
      if (!state.currentPiece || state.isGameOver || state.isPaused) {
        return;
      }

      if (isValidPosition(state.grid, state.currentPiece, -1, 0)) {
        set({
          currentPiece: {
            ...state.currentPiece,
            position: {
              x: state.currentPiece.position.x - 1,
              y: state.currentPiece.position.y,
            },
          },
        });
      }
    },

    moveRight: () => {
      const state = get();
      if (!state.currentPiece || state.isGameOver || state.isPaused) {
        return;
      }

      if (isValidPosition(state.grid, state.currentPiece, 1, 0)) {
        set({
          currentPiece: {
            ...state.currentPiece,
            position: {
              x: state.currentPiece.position.x + 1,
              y: state.currentPiece.position.y,
            },
          },
        });
      }
    },

    rotate: () => {
      const state = get();
      if (!state.currentPiece || state.isGameOver || state.isPaused) {
        return;
      }

      const newRotation = (state.currentPiece.rotation + 1) % 4;
      const rotatedPiece: Tetromino = {
        ...state.currentPiece,
        rotation: newRotation,
      };

      if (isValidPosition(state.grid, rotatedPiece)) {
        set({ currentPiece: rotatedPiece });
      }
    },

    drop: () => {
      const state = get();
      if (!state.currentPiece || state.isGameOver || state.isPaused) {
        return;
      }

      // Check if can move down
      if (isValidPosition(state.grid, state.currentPiece, 0, 1)) {
        // Move down
        set({
          currentPiece: {
            ...state.currentPiece,
            position: {
              x: state.currentPiece.position.x,
              y: state.currentPiece.position.y + 1,
            },
          },
        });
      } else {
        // Lock the piece and spawn a new one
        const newGrid = placeTetrominoOnGrid(state.grid, state.currentPiece);
        const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);
        const newPiece = spawnTetromino();

        // Check if game is over
        const gameOver = checkGameOver(clearedGrid, newPiece);

        set({
          grid: clearedGrid,
          currentPiece: gameOver ? null : newPiece,
          isGameOver: gameOver,
        });
      }
    },
  };
});
