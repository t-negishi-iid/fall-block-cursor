import { create } from 'zustand';
import type { Grid, Tetromino, GameState as IGameState } from '../types/game';

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
  return Array(GRID_ROWS)
    .fill(null)
    .map(() => Array(GRID_COLS).fill(0) as Grid[0]);
}

/**
 * Game store using Zustand
 */
export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  grid: createEmptyGrid(),
  currentPiece: null,
  isGameOver: false,
  isPaused: false,

  // Actions
  moveLeft: () => {
    console.log('moveLeft');
    // TODO: Implement move left logic
    set((state) => ({ ...state }));
  },

  moveRight: () => {
    console.log('moveRight');
    // TODO: Implement move right logic
    set((state) => ({ ...state }));
  },

  rotate: () => {
    console.log('rotate');
    // TODO: Implement rotation logic
    set((state) => ({ ...state }));
  },

  drop: () => {
    console.log('drop');
    // TODO: Implement drop logic
    set((state) => ({ ...state }));
  },
}));
