// Game state management with Zustand

import { create } from 'zustand';
import type { GameStore, GameStatus, Piece } from '../types/game';
import { createRandomPiece, rotateShapeClockwise } from '../utils/pieces';
import {
  createEmptyBoard,
  canMove,
  placePiece,
  clearLines,
  isGameOver,
  getRotationKick,
} from '../utils/collision';

// Scoring constants
const POINTS_PER_LINE: Record<number, number> = {
  1: 100,
  2: 300,
  3: 500,
  4: 800, // Tetris!
};

const LINES_PER_LEVEL = 10;

const initialState = {
  board: createEmptyBoard(),
  currentPiece: null as Piece | null,
  nextPiece: null as Piece | null,
  score: 0,
  level: 1,
  lines: 0,
  status: 'idle' as GameStatus,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: () => {
    const currentPiece = createRandomPiece();
    const nextPiece = createRandomPiece();
    
    set({
      ...initialState,
      currentPiece,
      nextPiece,
      status: 'playing',
    });
  },

  pauseGame: () => {
    const { status } = get();
    if (status === 'playing') {
      set({ status: 'paused' });
    }
  },

  resumeGame: () => {
    const { status } = get();
    if (status === 'paused') {
      set({ status: 'playing' });
    }
  },

  moveLeft: () => {
    const { board, currentPiece, status } = get();
    if (status !== 'playing' || !currentPiece) return;

    if (canMove(board, currentPiece, -1, 0)) {
      set({
        currentPiece: {
          ...currentPiece,
          position: {
            ...currentPiece.position,
            x: currentPiece.position.x - 1,
          },
        },
      });
    }
  },

  moveRight: () => {
    const { board, currentPiece, status } = get();
    if (status !== 'playing' || !currentPiece) return;

    if (canMove(board, currentPiece, 1, 0)) {
      set({
        currentPiece: {
          ...currentPiece,
          position: {
            ...currentPiece.position,
            x: currentPiece.position.x + 1,
          },
        },
      });
    }
  },

  moveDown: () => {
    const { board, currentPiece, nextPiece, score, level, lines, status } = get();
    if (status !== 'playing' || !currentPiece) return;

    if (canMove(board, currentPiece, 0, 1)) {
      set({
        currentPiece: {
          ...currentPiece,
          position: {
            ...currentPiece.position,
            y: currentPiece.position.y + 1,
          },
        },
      });
    } else {
      // Place the piece and spawn a new one
      const newBoard = placePiece(board, currentPiece);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      const newLines = lines + linesCleared;
      const newLevel = Math.floor(newLines / LINES_PER_LEVEL) + 1;
      const newScore = score + (POINTS_PER_LINE[linesCleared] || 0) * level;

      const newCurrentPiece = nextPiece || createRandomPiece();
      const newNextPiece = createRandomPiece();

      // Check for game over
      if (isGameOver(clearedBoard, newCurrentPiece)) {
        set({
          board: clearedBoard,
          currentPiece: null,
          nextPiece: null,
          score: newScore,
          level: newLevel,
          lines: newLines,
          status: 'gameover',
        });
      } else {
        set({
          board: clearedBoard,
          currentPiece: newCurrentPiece,
          nextPiece: newNextPiece,
          score: newScore,
          level: newLevel,
          lines: newLines,
        });
      }
    }
  },

  rotate: () => {
    const { board, currentPiece, status } = get();
    if (status !== 'playing' || !currentPiece) return;

    const newShape = rotateShapeClockwise(currentPiece.shape);
    const kick = getRotationKick(board, currentPiece, newShape);

    if (kick) {
      set({
        currentPiece: {
          ...currentPiece,
          shape: newShape,
          rotation: (currentPiece.rotation + 1) % 4,
          position: {
            x: currentPiece.position.x + kick.x,
            y: currentPiece.position.y + kick.y,
          },
        },
      });
    }
  },

  hardDrop: () => {
    const { board, currentPiece, status } = get();
    if (status !== 'playing' || !currentPiece) return;

    let dropDistance = 0;
    let testPiece = { ...currentPiece };

    // Find the lowest valid position
    while (canMove(board, testPiece, 0, 1)) {
      testPiece = {
        ...testPiece,
        position: {
          ...testPiece.position,
          y: testPiece.position.y + 1,
        },
      };
      dropDistance++;
    }

    // Set the piece at the dropped position
    set({
      currentPiece: testPiece,
      score: get().score + dropDistance * 2, // Bonus points for hard drop
    });

    // Then trigger moveDown to place the piece
    get().moveDown();
  },

  tick: () => {
    const { status } = get();
    if (status === 'playing') {
      get().moveDown();
    }
  },

  resetGame: () => {
    set(initialState);
  },
}));
