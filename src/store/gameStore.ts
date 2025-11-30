import { create } from 'zustand';
import type { CellValue, Grid, Tetromino, TetrominoType, GameState as IGameState } from '../types/game';
import { isValidPosition, getRotatedShape } from '../utils/collision';
import { getTetrominoShape } from '../utils/pieces';

/**
 * Game store state interface
 */
interface GameStore extends IGameState {
  // Additional state
  score: number;
  nextPiece: Tetromino | null;
  isPlaying: boolean;
  isHardMode: boolean;
  // Actions
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  drop: () => void;
  hardDrop: () => void;
  startGame: () => void;
  resetGame: () => void;
  toggleHardMode: () => void;
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
 * Calculate score based on lines cleared
 * 1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines = 800
 */
function calculateScore(linesCleared: number): number {
  if (linesCleared === 0) return 0;
  if (linesCleared === 1) return 100;
  if (linesCleared === 2) return 300;
  if (linesCleared === 3) return 500;
  if (linesCleared === 4) return 800;
  return 800 + (linesCleared - 4) * 200; // Bonus for more than 4 lines
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
 * Initialize game state
 */
function initializeGame() {
  const grid = createEmptyGrid();
  const currentPiece = spawnTetromino();
  const nextPiece = spawnTetromino();
  return {
    grid,
    currentPiece,
    nextPiece,
    score: 0,
    isGameOver: false,
    isPaused: false,
    isPlaying: false,
    isHardMode: false,
  };
}

/**
 * Game store using Zustand
 */
export const useGameStore = create<GameStore>((set, get) => {
  const initialState = initializeGame();

  return {
    // Initial state
    grid: initialState.grid,
    currentPiece: initialState.currentPiece,
    nextPiece: initialState.nextPiece,
    score: initialState.score,
    isGameOver: initialState.isGameOver,
    isPaused: initialState.isPaused,
    isPlaying: initialState.isPlaying,
    isHardMode: initialState.isHardMode,

    // Actions
    moveLeft: () => {
      const state = get();
      if (!state.currentPiece || state.isGameOver || state.isPaused || !state.isPlaying) {
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
      if (!state.currentPiece || state.isGameOver || state.isPaused || !state.isPlaying) {
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
      if (!state.currentPiece || state.isGameOver || state.isPaused || !state.isPlaying) {
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
      if (!state.currentPiece || state.isGameOver || state.isPaused || !state.isPlaying) {
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
        // Lock the piece
        const newGrid = placeTetrominoOnGrid(state.grid, state.currentPiece);
        const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);

        // Calculate score
        const scoreIncrease = calculateScore(linesCleared);
        const newScore = state.score + scoreIncrease;

        // Use nextPiece as currentPiece, spawn new nextPiece
        const newCurrentPiece = state.nextPiece ? {
          ...state.nextPiece,
          position: {
            x: Math.floor((GRID_COLS - (getTetrominoShape(state.nextPiece.type)[0]?.length || 0)) / 2),
            y: 0,
          },
          rotation: 0,
        } : null;

        const newNextPiece = spawnTetromino();

        // Check if game is over
        const gameOver = newCurrentPiece ? checkGameOver(clearedGrid, newCurrentPiece) : true;

        set({
          grid: clearedGrid,
          currentPiece: gameOver ? null : newCurrentPiece,
          nextPiece: gameOver ? null : newNextPiece,
          score: newScore,
          isGameOver: gameOver,
        });
      }
    },

    hardDrop: () => {
      const state = get();
      if (!state.currentPiece || state.isGameOver || state.isPaused || !state.isPlaying) {
        return;
      }

      // Find the lowest valid position
      let dropDistance = 0;
      while (isValidPosition(state.grid, state.currentPiece, 0, dropDistance + 1)) {
        dropDistance++;
      }

      if (dropDistance === 0) {
        // Already at the bottom, just lock it
        const newGrid = placeTetrominoOnGrid(state.grid, state.currentPiece);
        const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);

        const scoreIncrease = calculateScore(linesCleared);
        const newScore = state.score + scoreIncrease;

        const newCurrentPiece = state.nextPiece ? {
          ...state.nextPiece,
          position: {
            x: Math.floor((GRID_COLS - (getTetrominoShape(state.nextPiece.type)[0]?.length || 0)) / 2),
            y: 0,
          },
          rotation: 0,
        } : null;

        const newNextPiece = spawnTetromino();
        const gameOver = newCurrentPiece ? checkGameOver(clearedGrid, newCurrentPiece) : true;

        set({
          grid: clearedGrid,
          currentPiece: gameOver ? null : newCurrentPiece,
          nextPiece: gameOver ? null : newNextPiece,
          score: newScore,
          isGameOver: gameOver,
        });
      } else {
        // Move to the bottom and lock
        const droppedPiece: Tetromino = {
          ...state.currentPiece,
          position: {
            x: state.currentPiece.position.x,
            y: state.currentPiece.position.y + dropDistance,
          },
        };

        const newGrid = placeTetrominoOnGrid(state.grid, droppedPiece);
        const { newGrid: clearedGrid, linesCleared } = clearLines(newGrid);

        // Calculate score: line clear + hard drop bonus (2 points per cell dropped)
        const lineClearScore = calculateScore(linesCleared);
        const hardDropBonus = dropDistance * 2;
        const scoreIncrease = lineClearScore + hardDropBonus;
        const newScore = state.score + scoreIncrease;

        const newCurrentPiece = state.nextPiece ? {
          ...state.nextPiece,
          position: {
            x: Math.floor((GRID_COLS - (getTetrominoShape(state.nextPiece.type)[0]?.length || 0)) / 2),
            y: 0,
          },
          rotation: 0,
        } : null;

        const newNextPiece = spawnTetromino();
        const gameOver = newCurrentPiece ? checkGameOver(clearedGrid, newCurrentPiece) : true;

        set({
          grid: clearedGrid,
          currentPiece: gameOver ? null : newCurrentPiece,
          nextPiece: gameOver ? null : newNextPiece,
          score: newScore,
          isGameOver: gameOver,
        });
      }
    },

    startGame: () => {
      const newState = initializeGame();
      set({
        ...newState,
        isPlaying: true,
      });
    },

    resetGame: () => {
      const newState = initializeGame();
      set(newState);
    },

    toggleHardMode: () => {
      set((state) => ({ isHardMode: !state.isHardMode }));
    },
  };
});
